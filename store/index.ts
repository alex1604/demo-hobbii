import IState from "./types/IState"
import uniqid from 'uniqid'
import IProject from "~/types/Project"

// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

export const state = (): IState => ({
    isTimerOn: false,
    activeProjectId: null,
    projects: []
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
}

export const actions = {
    createProject({ commit }, payload: { clientName: string, projectName: string }) {
        const id = uniqid();
        const project: IProject = {
            id,
            totalHours: 0,
            invoicedHours: 0,
            invoices: [],
            ...payload,
        }
        commit('addProject', project)
    },
    removeProject({ commit }, projectId: string) {
        commit('removeProject', projectId)
    },
}