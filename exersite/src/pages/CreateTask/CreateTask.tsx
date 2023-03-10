import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import _ from "underscore"
import { useInsertDocument } from "../../hooks/useInsertDocument"

import "./CreateTask.css"


//Interfaces
import { IData, IQuestionsList, ITaskInformations, ITask } from "../../interfaces/IData"

const CreateTask = () => {
  //Task
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [course, setCourse] = useState('')
  const [taskInformations, setTaskInformations] = useState<ITaskInformations>()


  //Questions
  const [questionTitle, setQuestionTitle] = useState('')
  const [content, setContent] = useState('')
  const [allow, setAllow] = useState<boolean|null>(null)
  const [alternatives, setAlternatives] = useState("")
  const [alternativesArr, setAlternativesArr] = useState<IData[]>([])
  const [answer, setAnswer] = useState(false)
  const [questionsList, setQuestionsList] = useState<IQuestionsList[]>([])

  //Converge taskInformations and questionsList

  const navigate = useNavigate()


  const allowSubmit = (e:any) => {
    if(e){

      if (e.target.checked) {
        setAllow(true)
        console.log("if  ", allow);
      } else {
        setAllow(false)
        console.log("else   ", allow);
      }
    }
  }

  //create post function
  const { insertDocument, response } = useInsertDocument('posts')

  const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (allow && taskInformations && questionsList) {
      const task: ITask = { taskInformations, questionsList }
      await insertDocument(task)
      navigate("/")
    } else {
      console.log("deu Errado");
    }
  }

  // This function insert a question in the array of questions
  const handleInsertQuestion = () => {

    const data = {
      questionTitle,
      content,
      alternativesArr,
    }

    if (data.questionTitle && data.content && !(_.isEmpty(data.alternativesArr))) {
      setQuestionsList((prevQuestionsList): IQuestionsList[] => {
        if (_.isEmpty(prevQuestionsList)) {
          return [data]
        } else {
          return [...prevQuestionsList, data]
        }
      })
    } else {
      console.log("Errou algo");

    }
    setAlternativesArr([])
    setQuestionTitle("")
    setContent('')
    setAnswer(false)
    return false
  }

  // this function update a task infomations when some useStates of the informations are changed 
  const handleTaskInformation = () => {

    const data = {
      taskTitle,
      description,
      course
    }
    if (data) {
      setTaskInformations(data)
    }
  }

  //This function add alternatives in the array of alternatives
  const handleAlternatives = () => {
    const data: IData = {
      alternative: alternatives,
      isCorrect: answer,
    }

    if (alternativesArr.length === 0) {
      setAlternativesArr([data])
    } else {
      setAlternativesArr([...alternativesArr, data])
    }
    setAlternatives("")

    const check: any = document.getElementById("checkbox")
    if (check.checked) {
      check.checked = false;
      setAnswer(false)
    }

  }

  const handleAnswer = (e: any) => {
    if (e.target.checked) {
      setAnswer(true)
    } else {
      setAnswer(false)
    }
  }
  return (
    <form onSubmit={handleCreateTask} className="task">
      <h2>Crie uma task</h2>
      <div className="create-task-container" >
        <h3>Informa????es Gerais da Task</h3>
        <div className="input-container">
          <label htmlFor="titulo">T??tulo da Task</label>
          <input
            type="text"
            name="taskTitle"
            placeholder="Insira um T??tulo"
            onChange={e => {
              setTaskTitle(e.target.value)
              handleTaskInformation()
            }}
            value={taskTitle || ""}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Task</label>
          <textarea
            name="description"
            placeholder="Insira a descri????o da task"
            onChange={(e) => {
              setDescription(e.target.value)
              handleTaskInformation()
            }}
            value={description || ''}
            required
          ></textarea>
        </div>
        <div className="input-container">
          <label htmlFor="course">Qual ?? a Mat??ria?</label>
          <input
            type="text"
            placeholder="Escreva o nome"
            onChange={(e) => {
              setCourse(e.target.value)
              handleTaskInformation()

            }}
            value={course || ''}
            required
          />
        </div>
      </div>

      <h3>Adicione as Quest??es</h3>
      <div className="create-question-container" >
        <div className="input-container">
          <label htmlFor="title">T??tulo da Quest??o</label>
          <input
            type="text"
            name="questionTitle"
            placeholder="Insira uma t??tulo"
            onChange={(e) => setQuestionTitle(e.target.value)}
            value={questionTitle || ''}
          />
        </div>
        <div className="input-container">
          <label htmlFor="content">Quest??o</label>
          <textarea
            name="description"
            placeholder="Insira o questionamento"
            onChange={(e) => setContent(e.target.value)}
            value={content || ''}
          ></textarea>
        </div>

        <div className="input-container-alternatives" >
          <label >Insira as Alternativas</label>
          <input
            type="text"
            name="alternatives"
            placeholder="insira as alternativas"
            onChange={(e) => {
              setAlternatives(e.target.value)
            }}
            value={alternatives || ''}
          />
          <div className="checkbox-container">
            <label>Est?? correta a Resposta?   </label>
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => handleAnswer(e)}
            />
          </div>
          <div className="button-container">
            {alternativesArr.length < 5 ? <button type="button" onClick={handleAlternatives}>Adicionar Alternativa:</button> : <button type="button" disabled>M??ximo de Alternativas</button>}
          </div>
        </div>
        <button className="submit-button" type="button" onClick={handleInsertQuestion}>Adicione a Quest??o na Task</button>
      </div>
      <input type="submit" />
      <input type="checkbox" onChange={(e) => allowSubmit(e)} /> <label htmlFor=""> Quer Fazer O Subit?</label>
    </form>
  )
}


export default CreateTask

