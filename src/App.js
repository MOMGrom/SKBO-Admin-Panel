import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';
import Advertising from "./components/Advertising"
import ChangePassword from './components/ChangePassword';
import { useState } from 'react';

import ApiController from './services/ApiController';
import { useEffect } from 'react';

function App() {

    const [API, setAPI] = useState(() => {
        let result = JSON.parse(sessionStorage.getItem("API"));
        if (!result) {
            return new ApiController("https://localhost:7121/api/");
        } else {
            console.log(result);
            return new ApiController(result.API_URL, result.AccessToken, result.isLogin);
        }
    });

    async function Auth(login, password) {
        await API.Login(login, password);
        sessionStorage.setItem("API", JSON.stringify(API));

        let new_state = { ...API };

        setAPI(new_state);
    }

    if (API.isLogin) {
        return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path='projects' element={<Projects API={API}/>} />
                        <Route path='advertising' element={<Advertising API={API}/>} />
                        <Route path="change_password" element={<ChangePassword API={API} />} />
                    </Routes>
                </div>
            </BrowserRouter>

        );
    } else {
        return (
            <div className="App">
                <Login Auth={Auth} />
            </div>
        )
    }
}

export default App;
