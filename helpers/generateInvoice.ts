import { IInvoice, IProject } from '~/types/Project';
import uniqid from 'uniqid'
import { round } from './round';

export const generateNewInvoice = (project: IProject, hourlyRate: number): IInvoice => {
    const { id, projectName, totalHours, invoicedHours } = project;
    const newInvoiceHours: number = round(totalHours - invoicedHours);
    const exactAmount: number = newInvoiceHours * hourlyRate;
    const newInvoice: IInvoice = {
        id: uniqid(),
        projectId: id,
        projectName: projectName,
        hours: newInvoiceHours,
        amount: round(exactAmount)
    }
    return newInvoice;
}

