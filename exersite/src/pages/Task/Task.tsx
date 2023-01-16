//hooks
import { FormEvent, useEffect, useState } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

//Interfaces
import { IAlternatives } from '../../interfaces/IAlternatives'
import IGrade, { IScore } from "../../interfaces/IGrades";

//Styles
import "./Task.css"


const Task = () => {

  // for the grade system
  const { insertDocument } = useInsertDocument("users_grade")
  const { userAuth } = useAuthentication()
  const [currentUser, setCurrentUser] = useState(userAuth.currentUser)
  const { document } = useFetchDocument("users_grade", null, currentUser?.uid)
  const {updateDocument} = useUpdateDocument("users_grade")



  //Get Task Data and convert json to object 
  const jsonPost = sessionStorage.getItem("task");
  const post = JSON.parse(jsonPost ? jsonPost : "{}");


  useEffect(() => {
    setCurrentUser(userAuth.currentUser)
  }, [userAuth])

  //Will store all marked alternatives 
  const fillArray = () => {
    return {
      isSelected: false,
      isCorrect: false,
    }
  }
// This array wil hold all the checked alternatives 
  const [alternativesSelection, setAlternativesSelection] = useState<IAlternatives[][]>
    (Array.from({ length: post.questionsList.length },
      () => Array.from({ length: 5 }, () => { return fillArray() }
      )
    ));

  // Change the values in the alternativesSelection cell
  const changeValues = (e: any, row: number, col: number) => {
    let cell = [...alternativesSelection];
    if (e) {
      cell[row][col] = {
        isSelected: e.target.checked,
        isCorrect: post.questionsList[row].alternativesArr[col].isCorrect,
      };
      setAlternativesSelection(cell);
    }
  }

  //Will update or insert a document in the database
  const handleGrade = async (nota: number) => {
    console.log(nota);

    const singleScoreTask: IScore = {
      value: nota,
      taskLocation: post.id
    }
    if (!document) {
      const grade: IGrade = {
        score: [singleScoreTask],
        userId: currentUser?.uid,
      }
      insertDocument(grade)
    } else {
      const gradeArr: IGrade = {
        userId: currentUser?.uid,
        score: [...document.score,singleScoreTask]
      }
      updateDocument(gradeArr, null, currentUser?.uid)
    }
  }

// this function will check if the cells in alternativeSelection was selected the user and if it is correct.
// this recursive function, will be called for each cell and when it pass all array, will calculte the score,
// and call the handleGrade function with that score
  const handleAnswer = (e: FormEvent<HTMLFormElement>, row: number, col: number, arr: boolean[] | null[]) => {
    e.preventDefault()
    const cell = alternativesSelection[row][col];

    if (cell === alternativesSelection[alternativesSelection.length - 1][4]) {
      const questionsWeight = 100 / alternativesSelection.length
      let count = 0
      arr.map((e: any) => { if (e) count += questionsWeight })
      handleGrade(count)
      return
    }
    //verify if the col is in the last cell of the that column, if was, so the function will be called again. 
    if (4 === col) {
      handleAnswer(e, row + 1, col = 0, arr)
      // if the user selected the current cell, the function will be called again.
    } else if (cell.isSelected) {
      if (cell.isCorrect) {
        arr[row] = true
        handleAnswer(e, row, col + 1, arr);
      } else {
        arr[row] = false
        handleAnswer(e, row, col + 1, arr);
      }
    } else {
      if (cell.isCorrect) {
        arr[row] = false
        handleAnswer(e, row, col + 1, arr);
      } else {
        handleAnswer(e, row, col + 1, arr);
      }
    }
  }

  return (
    <div className='task-container'>
      <form onSubmit={(e) => handleAnswer(e, 0, 0, Array.from(
        { length: alternativesSelection.length }, () => null
      ))}>
        <div className="task-information">
          <h2>{post.taskInformations.taskTitle}</h2>
          <p>{post.taskInformations.description}</p>
        </div>
        {post.questionsList.map((itens: any, index: number) => {
          return (
            <ul key={index} className="questions-container">
              <h3>{itens.questionTitle}</h3>
              <p>{itens.content}</p>
              {itens.alternativesArr.map((alternative: any, indexAlternative: number) => {
                return (
                  <li key={indexAlternative} className="alternative-containers">
                    <input type="checkbox" id={`checkbox`} value={indexAlternative} onChange={(e) => {
                      changeValues(e, index, indexAlternative);

                    }} />
                    <label htmlFor={`Opção ${indexAlternative}`}>{alternative.alternative}</label>
                  </li>
                )
              })}
            </ul>
          )
        })}
        <input type="submit" value="Terminar" />
        <p className='course'>{post.taskInformations.course}</p>
      </form>
    </div>

  )
}

export default Task