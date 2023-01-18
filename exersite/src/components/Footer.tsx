import "./Footer.css"
import github_icon from "../imgs/github_icon.png"
import Linkedin_icon from "../imgs/Linkedin_icon.png"

const Footer = () => {
    return (
        <div className='footer'>
            <div className="social-medias">

                <a href="https://github.com/Christian-Schmitz-Barbosa" target="_blanck">
                    <img src={github_icon} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/christian-schmitz-barbosa-b455621a4/" target="_blanck">
                    <img src={Linkedin_icon} alt="Likedin" />
                </a>
            </div>
                <div className="site-name"> <h1>ExerSite &copy; 2023</h1> </div>
                <div className="author"> Criated By: Christian Schmitz Barbosa</div>
        </div>

    )
}

export default Footer