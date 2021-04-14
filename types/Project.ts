import { Moment } from "moment";

interface IInvoice {
    id: string;
    projectId: string;
    hours: number;
    amount: number;
}

interface ITimeLog {
    start: Moment;
    end: Moment;
}

export default interface IProject {
    id: string;
    clientName: string;
    projectName: string;
    totalHours: number;
    invoices: IInvoice[];
    invoicedHours: number;
}