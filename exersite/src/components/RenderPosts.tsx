import React from "react"
import { useNavigate } from "react-router-dom"
import "./RenderPosts.css"

interface Props {
  posts: any[],
}
const RenderPosts = ({ posts }: Props) => {
  const navigate = useNavigate()

  const handleVisualization = (post: any) => {

    const postVisualization = {
      id: post.id,
      taskInformations: post.taskInformations,
      questionsList: post.questionsList,
      url: post.url,
    }
    sessionStorage.setItem("task", JSON.stringify(postVisualization))

    navigate(`/posts/${post.id}`)
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: any, index: number) => { 
          return <div className="posts-itens" key={index}>
            <h2>
              {post.taskInformations.taskTitle}
            </h2>
            <button type="button" onClick={() => handleVisualization(post)}>+</button>
          </div>
        })
      ) : (
        <div className="posts-itens">
          <h1>Não há Tarefas</h1>
        </div>
      )
      }
    </>


  )
}

export default RenderPosts