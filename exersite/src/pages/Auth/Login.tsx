import {
  useState,
  FormEvent
} from "react"
import "./Auth.css"

type Props = {}

const Login = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password) {

      // const user = {
      //   name,
      //   email,
      //   password,
      //   historicoTest: [],
      //   trofeus:[],
      // }
    } else {

    }
  }

  return (
    <div className='register auth'>
      <form onSubmit={handleSubmit}>
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

    </div>
  )
}

export default Login