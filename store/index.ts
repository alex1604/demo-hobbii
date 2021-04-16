import IState from "./types/IState"
import uniqid from 'uniqid'
import { IProject, IInvoice, ITimeLog } from "~/types/Project"
import moment, { Moment } from "moment";
import { getNewProjectsState } from "~/helpers/getNewProjectsState";
import { generateNewInvoice } from "~/helpers/generateInvoice"
import { round } from "~/helpers/round";

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
    updateTimeLog(state: IState, updatedProject: IProject) {
        state.projects = getNewProjectsState(state.projects, updatedProject);
    },
    setActiveProject(state: IState, projectId?: string) {
        state.activeProjectId = projectId || '';
    },
    setTotalHours(state: IState, updatedProject: IProject) {
        state.projects = getNewProjectsState(state.projects, updatedProject);;
    },
    setInvoice(state: IState, { invoice, updatedProject }: { invoice: IInvoice, updatedProject: IProject }) {
        state.projects = getNewProjectsState(state.projects, updatedProject);
        state.displayInvoice = true;
        state.latestInvoice = invoice;
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
    removeProject({ commit, state }: { dispatch, commit, state: IState }, projectId: string) {
        if (state.isTimerOn && state.activeProjectId === projectId) {
            commit('stopTimer');
            commit('setActiveProject')
        }
        commit('removeProject', projectId)
    },
    startTracking({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            commit('setActiveProject', projectId)
            commit('setTimer');
            const startMoment: Moment = moment();
            const updatedProject = {
                ...targetProject,
                timeLogs: [
                    ...targetProject.timeLogs,
                    {
                        start: startMoment,
                    }
                ]
            }
            commit('updateTimeLog', updatedProject)
        }
    },
    stopTracking({ dispatch, commit, state }: { dispatch, commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        const activeTimeLog = targetProject?.timeLogs.find((log: ITimeLog) => !log.end)
        if (targetProject && activeTimeLog) {
            commit('stopTimer');
            commit('setActiveProject')
            const endMoment: Moment = moment();
            const currentTimeLog: ITimeLog = activeTimeLog;
            const updatedProject = {
                ...targetProject,
                timeLogs: [
                    ...targetProject.timeLogs.filter((timeLog: ITimeLog) => timeLog !== currentTimeLog),
                    {
                        ...currentTimeLog,
                        end: endMoment
                    }
                ]
            }
            commit('updateTimeLog', updatedProject)
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
                return total + moment(end).diff(moment(start), 'hours', true);
            }, 0)
            const rounded = round(totalHours);
            const updatedProject: IProject = {
                ...targetProject,
                totalHours: rounded
            }
            commit('setTotalHours', updatedProject)
        }
    },
    createInvoice({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            const invoice: IInvoice = generateNewInvoice(targetProject, state.hourlyRate);
            const totalInvoicedHours: number = targetProject.invoicedHours + invoice.hours;
            const updatedProject: IProject = {
                ...targetProject,
                invoices: [
                    ...targetProject.invoices,
                    invoice
                ],
                invoicedHours: round(totalInvoicedHours)
            }
            commit('setInvoice', { invoice, updatedProject })
        }
    },
    displayInvoice({ commit }, display: boolean) {
        commit('setDisplayInvoice', display);
    },
    archiveProject({ commit, state }: { commit, state: IState }, projectId: string) {
        const targetProject: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
        if (targetProject) {
            commit('archiveProject', targetProject);
            commit('removeProject', projectId)
        }
    }
}