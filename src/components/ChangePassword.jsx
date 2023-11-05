import { useState } from "react";
import style from "./ChangePassword.module.css"
import NavBar from "./NavBar";

function ChangePassword() {


    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")


    function handleFormSubmit(event) {

        event.preventDefault()

        if (
            (newPassword === confirmNewPassword) &&
            (newPassword !== "") &&
            (oldPassword !== "") &&
            (newPassword.length >= 6)) {
        
            let passwordData = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        }
        console.log(passwordData)
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    } else if (newPassword !== confirmNewPassword) {
        alert("Пароли не совпадают")
    } else if (newPassword === "") {
        alert("Все поля должны быть заполнены!")
    } else if (oldPassword === "") {
        alert("Все поля должны быть заполнены!")
    } else if (newPassword.length <= 6) {
        alert("Пароль должен быть больше 6 символов")
    }  
    }
    return( <>
    <div className={style.NavBar}><NavBar/></div>
        <div className={style.mainContainer}>
            <h1 className={style.title}>Изменить пароль</h1>
            <div className={style.mainFormContainer}>
                <form onSubmit={handleFormSubmit}>
                    <div className={style.oldPassword}>
                        <label>Старый пароль:</label>
                        <input 
                        type="password"
                        value={oldPassword}
                        onChange={(event) => setOldPassword(event.target.value)} />
                    </div>

                    <div className={style.newPassword}>
                        <label>Новый пароль:</label>
                        <input 
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)} />
                    </div>

                    <div className={style.confirmNewPassword}>
                        <label>Подтвердите пароль:</label>
                        <input 
                        type="password"
                        value={confirmNewPassword}
                        onChange={(event) => setConfirmNewPassword(event.target.value)} />
                    </div>
                    <button className={style.confirmBt}type="submit">Сохранить</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default ChangePassword;