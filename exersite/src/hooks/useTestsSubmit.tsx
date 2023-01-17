import _ from "underscore"
import { IQuestionsList, ITaskInformations } from "../interfaces/IData"

export const useTestsSubmit = (taskInformations: ITaskInformations | undefined, questionsList: IQuestionsList[] | undefined) => {

    
    const taskInformationsTest = (!(_.isEmpty(taskInformations!.course))&& taskInformations!.description !== ''&& taskInformations!.taskTitle !== '')

    
    if (taskInformationsTest && !(_.isEmpty(questionsList))) {
        return true
    } else {
        return false
    }

}   