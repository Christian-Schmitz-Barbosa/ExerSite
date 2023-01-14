export interface IData {
    alternative: string;
    isCorrect: boolean;
}
export interface IQuestionsList {
    questionTitle: string;
    content: string;
    alternativesArr: IData[];
}
export interface ITaskInformations{
    taskTitle:string;
    description:string;
    course:string;
}

export interface ITask{
    taskInformations: ITaskInformations;
    questionsList: IQuestionsList[];
}