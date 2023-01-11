import { useState, FormEvent } from "react"
import {  NavLink } from "react-router-dom"
import { useAuthentication } from "../../hooks/useAuthentication"
import "./Auth.css"

type Props = {}

const Login = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')

  const { login, loading, error } = useAuthentication()


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const data = {
        email,
        password,
      }
      login(data)
  }

  return (
    <div className='register auth'>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Login</h1>
        <div className="input_container">
          <label htmlFor='email'>E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder='Digite o seu e-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </div>
        <div className="input_container">
          <label htmlFor='password'>Senha:</label>
          <input
            type="password"
            name="password"
            placeholder='Digite a sua senha'
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </div>

        <input type="submit" className="btn" value="Enviar" />
      </form>
      <div className="link">
        <h2>Ainda não é cadastrado?</h2>
        <NavLink to = "/register">Criar conta</NavLink>
      </div>
    </div>
  )
}

export default Login