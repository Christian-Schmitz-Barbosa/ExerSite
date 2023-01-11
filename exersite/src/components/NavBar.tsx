import { NavLink, Link } from "react-router-dom"

import "./NavBar.css"
import question_mark from "../imgs/Ponto-de-Interrogação.png"
import Logo from "../imgs/Logo.png"

// hooks
import { useAuthentication } from "../hooks/useAuthentication"
interface Props  {
    programs?: string[]
}
const NavBar = ({}:Props) => {
    const {logOut} = useAuthentication()

    return (
        <div id="navbar">
            <div className="navbar-upperside">
                <Link className="logo" to="/">
                    <img src={Logo} alt="Logo" />
                    <h1>ExerSite</h1>
                </Link>
                <form>
                    <img src={question_mark} alt="Interrogação" />
                    <input type="text" placeholder="Pergunte" />
                </form>
            </div>
            <nav className="menu">
                <ul className="nav-menu">
                    <li >
                        <NavLink to="/">Home</NavLink>

                    </li>
                    <li className="menu-dropdown"> <a href="#"> Materias
                        <ul>

                        </ul>
                    </a>

                    </li>
                    <li className="menu-dropdown"> <a href="#">Conta
                        <ul>
                            <li><a href="#">Atualizar Conta</a></li>
                            <li><a href="#">Configuração</a></li>
                            <li><Link to="/login" onClick={logOut}>Sair</Link></li>
                        </ul>
                    </a></li>
                    <li>
                        <NavLink to="/about">Sobre</NavLink>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default NavBar