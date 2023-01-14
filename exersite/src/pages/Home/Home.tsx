import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'


const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts")
  const navigate = useNavigate()
  console.log(posts);
  

  const handleVisualization = (post:any) => {
    
    const postVisualization = {
      id: post.id,
      taskInformations: post.taskInformations,
      questionsList: post.questionsList,
      url: post.url,
    } 
    sessionStorage.setItem("task", JSON.stringify(postVisualization))

    navigate(`/posts/${post.id}`)
  }
  
  const renderPosts = () => {
    return posts.map((post, index:number) => (
      <div key={index}>
        {post.taskInformations.taskTitle}
        <button onClick={() => handleVisualization(post)}> Visualizar Teste </button>
      </div>
    ))
  }

  return (
    <div>
      {renderPosts()}
    </div>
  )
}

export default Home