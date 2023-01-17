import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import "./User.css"
function User() {
    const userContext = useAuthValue()
    const {document} = useFetchDocument("users_grade", null, userContext.uid)
    

    return (
        <div className="user-container">
            <h2>Informações Do Usuário</h2>
            <div className="user-info">
                <p>Nome: {userContext.displayName}</p>
                <p>Email: {userContext.email}</p>
            </div>
            <div className="user-historic">
                <h3>Histórico de Tasks Completas</h3>
                {document?.score.map((score, index)=>(
                    <div className="task-history-container" key={index}>
                        <p>{score?.taskName}</p>
                        <p>Nota: {score.value}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default User