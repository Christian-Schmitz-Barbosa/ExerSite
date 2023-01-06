import { NavLink, Link } from "react-router-dom"

import "./NavBar.css"
import question_mark from "../imgs/Ponto-de-Interrogação.png"
import Logo from "../imgs/Logo.png"
const NavBar = () => {
    return (
        <div id="navbar">
            <div className="navbar-upperside">
                <Link className="logo" to="/">
                    <img src={Logo} alt="Logo" />
                    <h1>ExerSite</h1>
                </Link>
                <form>
                    <img src={question_mark} alt="Interrogação" />
                    <input type="text" placeholder="Pergunte"/>
                </form>
            </div>
            <nav id="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">Sobre</NavLink>
            </nav>

        </div>
    )
}

export default NavBar