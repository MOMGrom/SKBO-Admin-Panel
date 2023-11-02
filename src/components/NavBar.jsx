import style from "./NavBar.module.css"
import logo from "../data/SKBO-Logo.png"
import { Link } from 'react-router-dom';

function NavBar() {
    return(
        <div className={style.navBarContainer}>
            <img src={logo} alt="" height={50} width={90}/>
            <div className={style.objectLink} ><Link to="/objects">Объекты<Link/></div>
            <div className={style.advertisingLink}><Link to="/advertising">Реклама<Link/></div>
        </div>
    )
}


export default NavBar;