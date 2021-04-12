interface IInvoice {
    id: string;
    projectId: string;
    hours: number;
    amount: number;
}

export default interface IProject {
    id: string;
    clientName: string;
    projectId: string;
    projectName: string
    totalHours: number;
    invoices: IInvoice[];
}