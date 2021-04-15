export const round = (hours: number): number => {
    return hours < 1 ? Math.round(hours * 10000) / 10000 : Math.round(hours * 100) / 100;
}