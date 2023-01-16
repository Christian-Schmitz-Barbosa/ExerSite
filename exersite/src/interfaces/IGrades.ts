export default interface IGrade {
    score: IScore[];
    userId?: string;
}

export interface IScore{
    value:number;
    taskLocation:string;
}