import IProject from "~/types/Project";

export default interface IState {
    isTimerOn: boolean;
    activeProjectId: string | null;
    projects: IProject[];
}