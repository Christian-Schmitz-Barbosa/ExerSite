import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useInsertDocument } from "../../hooks/useInsertDocument"


//Interfaces
import { IData } from "../../interfaces/IData"

const CreateTask = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [alternatives, setAlternatives] = useState("")
  const [alternativesArr, setAlternativesArr] = useState<IData[]>([])
  const [answer, setAnswer] = useState(false)
  const [course, setCourse] = useState('')
  

  const navigate = useNavigate()

  //create post function
  const { insertDocument, response } = useInsertDocument('posts')
  const handleCreateTask = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    insertDocument(
      {
        title,
        content,
        alternativesArr,
        course
      }
    )
    navigate("/")
  }

  const handleAlternatives = () => {
    const data: IData = {
      alternative: alternatives,
      isCorrect: answer,
      id: Math.random() * (10 - 1) + 1
    }
    if (data) {
      setAlternativesArr([...alternativesArr, data])
      setAlternatives("")

      const check: any = document.getElementById("check-box")
      if (check.checked) {
        check.checked = false;
        setAnswer(false)
      }

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
    <div id="teste">
      <h2>Create a task</h2>
      <form className="create-task-container" onSubmit={handleCreateTask}>
        <div className="input-container">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Insira uma título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ''}
          />
        </div>
        <div className="input-container">
          <label htmlFor="content">Questão</label>
          <textarea
            name="description"
            placeholder="Insira o questionamento"
            onChange={(e) => setContent(e.target.value)}
            value={content || ''}
          ></textarea>
        </div>

        <div className="input-container">
          <label >Alternativas</label>
          <input
            type="text"
            name="alternatives"
            placeholder="insira as alternativas"
            onChange={(e) => {
              setAlternatives(e.target.value)
            }}
            value={alternatives || ''}
          />
          <div>
            <p>Está correta a resposta?</p>
            <input
              type="checkbox"
              id="check-box"
              onChange={(e) => handleAnswer(e)}
            />
            <button type="button" onClick={handleAlternatives}>Do something</button>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="course">Qual é a Matéria?</label>
          <input
            type="text"
            placeholder="Escreva o nome da matéria"
            onChange={(e) => {
              setCourse(e.target.value)
            }}
            value={course || ''}
          />
        </div>
        <input type="submit" value="Postar" />
      </form>
    </div>
  )
}


export default CreateTask