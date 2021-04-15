import IState from "./types/IState"
import uniqid from 'uniqid'
import IProject, { IInvoice } from "~/types/Project"
import moment, { Moment } from "moment";
import { ITimeLog } from '../types/Project';
import { getNewProjectsState } from "~/helpers/getNewProjectsState";

export const state = (): IState => ({
    isTimerOn: false,
    activeProjectId: null,
    projects: [],
    displayInvoice: false,
    latestInvoice: null,
    hourlyRate: 500,
    archive: [],
})

export const getters = {
    projectNames: (state: IState) => {
        return state.projects.map((project: IProject) => project.projectName);
    }
};

export const mutations = {
    addProject(state: IState, payload: IProject) {
        state.projects = [...state.projects, payload];
    },
    removeProject(state: IState, projectId: string) {
        state.projects = state.projects.filter((project: IProject) => project?.id !== projectId);
    },
    setTimer(state: IState) {
        state.isTimerOn = true;
    },
    stopTimer(state: IState) {
        state.isTimerOn = false;
    },
    updateTimeLog(state: IState, { targetProject, startMoment, endMoment }: { targetProject: IProject, startMoment?: Moment, endMoment?: Moment }) {
        let updatedProject: IProject;
        if (startMoment) {
            updatedProject = {
                ...targetProject,
                timeLogs: [
                    ...targetProject.timeLogs,
                    {
                        start: startMoment,
                    }
                ]
            }
        } else {
            const currentTimeLog: ITimeLog | undefined = targetProject.timeLogs.find((timeLog: ITimeLog) => !timeLog.end);
            updatedProject = {
                ...targetProject,
                timeLogs: [
                    ...targetProject.timeLogs.filter((timeLog: ITimeLog) => timeLog !== currentTimeLog),
                    {
                        ...currentTimeLog,
                        end: endMoment
                    }
                ]
            }
        }
        state.projects = getNewProjectsState(state.projects, updatedProject, targetProject.id);
    },
    setActiveProject(state: IState, projectId?: string) {
        state.activeProjectId = projectId || '';
    },
    setTotalHours(state: IState, { targetProject, totalHours }: { targetProject: IProject, totalHours: number }) {
        const updatedProject: IProject = {
            ...targetProject,
            totalHours
        }
        state.projects = getNewProjectsState(state.projects, updatedProject, targetProject.id);;
    },
    generateInvoice(state: IState, targetProject: IProject) {
        const { totalHours, invoicedHours } = targetProject;
        const newInvoiceHours: number = totalHours - invoicedHours;
        const exactAmount: number = newInvoiceHours * state.hourlyRate;
        const newInvoice: IInvoice = {
            id: uniqid(),
            projectId: targetProject.id,
            projectName: targetProject.projectName,
            hours: newInvoiceHours,
            amount: Math.round(exactAmount * 100) / 100,
        }
        const updatedProject: IProject = {
            ...targetProject,
            invoices: [
                ...targetProject.invoices,
                newInvoice
            ],
            invoicedHours: Math.round((targetProject.invoicedHours + newInvoiceHours) * 100) / 100
        }
        state.projects = getNewProjectsState(state.projects, updatedProject, targetProject.id);
        state.displayInvoice = true;
        state.latestInvoice = newInvoice;
    },
    setDisplayInvoice(state: IState, display: boolean) {
        state.displayInvoice = display;
    },
    archiveProject(state: IState, project: IProject) {
        state.archive = [
            ...state.archive,
            project
        ]
    }
}

export const actions = {
    createProject({ commit }, payload: { clientName: string, projectName: string }) {
        const id = uniqid();
        const project: IProject = {
            id,
            totalHours: 0,
            invoicedHours: 0,
            invoices: [],
            timeLogs: [],
            ...payload,
        }
        commit('addProject', project)
    },
    removeProject({ commit }, projectId: string) {
        commit('removeProject', projectId)
    },
    startTracking({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            commit('setActiveProject', projectId)
            commit('setTimer');
            const startMoment: Moment = moment();
            commit('updateTimeLog', { targetProject, startMoment })
        }
    },
    stopTracking({ dispatch, commit, state }: { dispatch, commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            commit('stopTimer');
            commit('setActiveProject')
            const endMoment: Moment = moment();
            commit('updateTimeLog', { targetProject, endMoment })
            dispatch('setProjectHours', projectId)
        }
    },
    setProjectHours({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            const totalHours: number = targetProject.timeLogs.reduce((total, current) => {
                const { start, end } = current;
                if (!start || !end) {
                    return 0;
                }
                return total + end.diff(start, 'hours', true);
            }, 0)
            const rounded = totalHours < 1 ? Math.round(totalHours * 10000) / 10000 : Math.round(totalHours * 100) / 100;
            commit('setTotalHours', { targetProject, totalHours: rounded })
        }
    },
    addInvoice({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            commit('generateInvoice', targetProject)
        }
    },
    setDisplayInvoice({ commit }, display: boolean) {
        commit('setDisplayInvoice', display);
    },
    archiveProject({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            commit('archiveProject', targetProject);
            commit('removeProject', targetProject)
        }
    }
}