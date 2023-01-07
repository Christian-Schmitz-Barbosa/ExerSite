import {
  useState,
  FormEvent
} from "react"
import "./Auth.css"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {

      // const user = {
      //   name,
      //   email,
      //   password,
      //   historicoTest: [],
      //   trofeus:[],
      // }
    }else{

    }
  }

  return (
    <div className='register auth'>
      <form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <div className="input_container">
          <label htmlFor='name'>Nome:</label>
          <input
            type="text"
            name="name"
            placeholder='Digite o seu nome'
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
        </div>
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
        <div className="input_container">
          <label htmlFor='confirmPassword'>Confirme a Senha:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder='Confirme a sua senha'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword || ""}
          />
        </div>
        <input type="submit" className="btn" value="Enviar"/>
      </form>

    </div>
  )
}
export default Register