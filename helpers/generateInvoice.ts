import { IInvoice, IProject } from '~/types/Project';
import uniqid from 'uniqid'

export const generateNewInvoice = (project: IProject, hourlyRate: number): IInvoice => {
    const { id, projectName, totalHours, invoicedHours } = project;
    const newInvoiceHours: number = totalHours - invoicedHours;
    const exactAmount: number = newInvoiceHours * hourlyRate;
    const newInvoice: IInvoice = {
        id: uniqid(),
        projectId: id,
        projectName: projectName,
        hours: newInvoiceHours,
        amount: Math.round(exactAmount * 100) / 100,
    }
    return newInvoice;
}

