import style from "../components/Login.module.css"

function Login() {
    return(
        <div className={style.mainContainer}>
            <div className={style.LoginContainer}>
                <div className={style.titleContainer}>
                    <h1 className={style.title}>Авторизация</h1>
                </div>

                <div className={style.formContainer}>
                    <form action="#">
                        <div className={style.inputContainer}>
                        <div className={style.login}>
                            <label>Логин</label>
                            <input type="text" />
                        </div>

                        <div className={style.password}>
                            <label>Пароль</label>
                            <input type="password" />
                        </div>
                        </div>
                    </form>
                    <button className={style.loginBt}>Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Login;