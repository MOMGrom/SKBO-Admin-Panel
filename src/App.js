import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';
import Advertising from "./components/Advertising"
import ChangePassword from './components/ChangePassword';
import Redirect from './components/Redirect';

import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import ApiController from './services/ApiController';

function App() {

    const [API, setAPI] = useState(() => {
        let result = JSON.parse(sessionStorage.getItem("API"));
        if (!result) {
            return new ApiController("https://skbo-group.ru/api/");
        } else {
            return new ApiController(result.API_URL, result.AccessToken, result.isLogin, result.login);
        }
    });

    async function Auth(login, password)
    {
        let result = await API.Login(login, password);

        sessionStorage.setItem("API", JSON.stringify(API));

        let new_state = new ApiController(API.API_URL, API.AccessToken, API.isLogin, API.login);
        setAPI(new_state);

        if (!result) {

            Store.addNotification({
                title: "Error",
                message: "Incorrect password or login",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                },
                contentEncoder: "UTF-8"
            });
        }
    }

    if (API.isLogin) {
        return (
            
                <BrowserRouter>
                    <div className="App">
                        <ReactNotifications/>
                        <Routes>
                            <Route path='projects' element={<Projects API={API} />} />
                            <Route path='advertising' element={<Advertising API={API} />} />
                            <Route path="change_password" element={<ChangePassword API={API} />} />
                            <Route path='*' element={<Redirect to="projects" />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            
        );
    } else
    {
        return (
            
            <div className="App">
                <ReactNotifications/>
                <Login Auth={Auth} />
            </div>
            
        )
    }
}

export default App;
