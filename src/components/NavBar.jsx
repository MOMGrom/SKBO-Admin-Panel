import style from "./NavBar.module.css"; 
import logo from "../data/SKBO-Logo.png";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();

    return (
        <div className={style.navBarContainer}>
            <img src={logo} alt="" height={50} width={90} />
            <div onClick={()=>{navigate("../projects")}}className={style.objectLink}>Объекты
            </div>
            <div onClick={()=>{navigate("../advertising")}} className={style.advertisingLink}>Реклама
            </div>
            <div onClick={()=>{navigate("../change_password")}} className={style.changePassword}>
                Изменить пароль
            </div>
        </div>
    );
}

export default NavBar;
