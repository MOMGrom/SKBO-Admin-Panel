import { useState } from "react";
import style from "./SideBar.module.css";
import img1 from "../data/SKBO-Logo.png"


function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false)

function dropDown() {
  
}

  function handleOnClickOpen() {
    setIsOpen(true);
    console.log(isOpen);
  }
  function handleOnClickClose() {
    setIsOpen(false);
    console.log(isOpen);
  }
  return (
    <div>
      <button className={style.openBt} onClick={handleOnClickOpen}>
открыть
      </button>
      <div className={isOpen ? style.openContainer : style.container}>
        <img className={style.logo} src={img1}/>
        
        <div className={style.workerProfile}>
          <div className={style.FCs}>Admin</div>
        </div>
        <div className={style.containerRout}>
          <div>Объекты</div>
          <div>Реклама</div>
        </div>
        <div className={style.closeBtContainer}>
          <button className={style.closeBt} onClick={handleOnClickClose}>
            закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
