import { useEffect, useState } from 'react'
import { isTemplateExpression } from 'typescript';
import { IAlternatives } from '../../interfaces/IAlternatives'



const Task = () => {

  //Get Task Data and convert json to object 
  const jsonPost = sessionStorage.getItem("task");
  const post = JSON.parse(jsonPost ? jsonPost : "{}");

  //Will store all marked alternatives 
  const fillArray = () => {
    return {
      isSelected: false,
      idAlternative: 0,
      isCorrect: false,
    }
  }

  const [alternativesSelection, setAlternativesSelection] = useState<IAlternatives[][]>
    (Array.from({ length: post.questionsList.length },
      () => Array.from({ length: 5 }, () => { return fillArray() }
      )
    ));

const handleAlternativesSelectionChange = () => {
  let copy = [...alternativesSelection]
  copy[0][0] = {
    isSelected: true,
    idAlternative: 2,
    isCorrect: false,
  }
  setAlternativesSelection(copy)
  console.log(alternativesSelection);
  
}

  useEffect(() => {
    if (post.questionsList) {

    }
  }, [post])

  return (
    <div>
      <form>
        <h2>{post.taskInformations.taskTitle}</h2>
        <p>{post.taskInformations.description}</p>
        <p>-------------------------------------</p>
        {post.questionsList.map((itens: any) => {
          return (
            <div>
              <h3>{itens.questionTitle}</h3>
              <p>{itens.content}</p>
              {itens.alternativesArr.map((alternative: any, indexAlternative: number) => {
                return (
                  <div key={indexAlternative}>
                    <input type="checkbox" name={`Opção ${indexAlternative}`} value={indexAlternative} />
                    <label htmlFor={`Opção ${indexAlternative}`}>{alternative.alternative}</label>
                  </div>
                )
              })}
            </div>
          )
        })}
        <p>------------------------------------------</p>
        <button type='button' onClick={handleAlternativesSelectionChange}> Aperte</button>
        <input type="submit" value="Terminar" />
        <p>------------------------------------------</p>
        <p>{post.taskInformations.course}</p>
      </form>
    </div>

  )
}

export default Task