import { NavLink, Link } from "react-router-dom"

import "./NavBar.css"
import question_mark from "../imgs/Ponto-de-Interrogação.png"
import Logo from "../imgs/Logo.png"

// hooks
import { useAuthentication } from "../hooks/useAuthentication"

//context
import { useAuthValue } from "../context/AuthContext"


const NavBar = () => {
    const { logOut } = useAuthentication()
    
    const userContext = useAuthValue()


    return (
        <div id="navbar">
            <div className="navbar-upperside">
                <Link className="logo" to="/">
                    <img src={Logo} alt="Logo" />
                    <h1>ExerSite</h1>
                </Link>

                {/*For now, the search system is not finished */}
                {/* <form>
                    <img src={question_mark} alt="Interrogação" />
                    <input type="text" placeholder="Pergunte" />
                </form> */}
            </div>
            <nav className="menu">
                <ul className="nav-menu">
                    {userContext.uid && <>
                        <li className="corner-left" >
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            {/* <NavLink to="/createtask">Criar</NavLink> */}
                            
                        </li>
                        <li className="menu-dropdown"> <a href="#">Configurações
                            <li className="shadow-menu">
                                <li><Link to={`/users/${userContext.uid}`}>Conta</Link></li>
                                <li><Link to="/login" onClick={()=> {logOut()}}>Sair</Link></li>
                            </li>
                        </a></li>

                    </>}

                    {!userContext.uid && <>
                        <li className="corner-left">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>}
                    <li className="corner-right">
                        <NavLink to="/about">Sobre</NavLink>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default NavBar