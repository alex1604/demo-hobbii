import { Moment } from "moment";

export interface IInvoice {
    id: string;
    projectId: string;
    projectName: string;
    hours: number;
    amount: number;
}

export interface ITimeLog {
    start?: Moment;
    end?: Moment;
}

export default interface IProject {
    id: string;
    clientName: string;
    projectName: string;
    totalHours: number;
    invoices: IInvoice[];
    invoicedHours: number;
    timeLogs: ITimeLog[];
}