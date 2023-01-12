import React from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

type Props = {}

const Home = (props: Props) => {
  const { documents: posts, loading } = useFetchDocuments("posts")
  const renderPosts = () => {
    return posts.map(post => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.alternativesArr.map((alternative: any) => {
          return <p key={alternative.index}>
            {alternative.alternative}
          </p>
        })}
        <p>{post.course}</p>
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