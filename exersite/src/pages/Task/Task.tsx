import  { useEffect, useState } from 'react'
import { isTemplateExpression } from 'typescript';
import { IData } from '../../interfaces/IData'



const Task = () => {

  //Get Task Data and convert json to object 
  const jsonPost = sessionStorage.getItem("task");
  const post = JSON.parse(jsonPost ? jsonPost : "{}");

  //Will store all marked alternatives 

  const [alternativesSelection, setAlternativesSelection] = useState<[][]>([post.questionsList.length][5])
  useEffect(()=> {
    if(post.questionsList){

    }
  },[post])

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
                    <input type="checkbox"/>
                    <label>{alternative.alternative}</label>
                  </div>
                )
              })}
            </div>
          )
        })}
        <p>------------------------------------------</p>
        <input type="submit" value="Terminar" />
        <p>------------------------------------------</p>
        <p>{post.taskInformations.course}</p>
      </form>
    </div>

  )
}

export default Task