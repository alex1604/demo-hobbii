import IProject from "~/types/Project";
import { IInvoice } from '../../types/Project';

export default interface IState {
    isTimerOn: boolean;
    activeProjectId: string | null;
    projects: IProject[];
    displayInvoice: boolean,
    latestInvoice: IInvoice | null,
    hourlyRate: number,
    archive: IProject[];
}