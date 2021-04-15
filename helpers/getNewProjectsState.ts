import { IProject } from "~/types/Project";

export const getNewProjectsState = (oldProjectsState: IProject[], updatedProject: IProject, currentProjectId: string) => {
    return oldProjectsState.map((project: IProject) => {
        if (project.id !== currentProjectId) {
            return project;
        }
        return updatedProject;
    })
}