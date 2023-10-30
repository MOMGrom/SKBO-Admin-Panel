import { useState } from "react";
import style from "../components/Login.module.css"

function Login() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function handleFormSubmit(event) {
        event.preventDefault()

        const adminData = {
            login,
            password,
        }
        console.log(adminData)

    }





    return(
        <div className={style.mainContainer}>
            <div className={style.LoginContainer}>
                <div className={style.titleContainer}>
                    <h1 className={style.title}>Авторизация</h1>
                </div>

                <div className={style.formContainer}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={style.inputContainer}>
                        <div className={style.login}>
                            <label>Логин</label>
                            <input 
                            type="text"
                            value={login}
                            onChange={(event) => setLogin(event.target.value)}/>
                        </div>

                        <div className={style.password}>
                            <label>Пароль</label>
                            <input 
                            type="password" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        </div>
                        <button type="submit" className={style.loginBt}>Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;