import { IProject } from "~/types/Project";

export const getNewProjectsState = (oldProjectsState: IProject[], updatedProject: IProject) => {
    return oldProjectsState.map((project: IProject) => {
        if (project.id !== updatedProject.id) {
            return project;
        }
        return updatedProject;
    })
}