import InitialState from "./types/InitialState"

export const state = (): InitialState => ({
    isTimerOn: false,
    activeProjectId: null
})