import "./Home.css"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import RenderPosts from "../../components/RenderPosts"



const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts")
 
  return (
    <div className='posts-container'>
      <h1>Lista de Tarefas</h1>
      <div className="posts">
      <RenderPosts posts={posts}/>
      </div>
    </div>
  )
}

export default Home