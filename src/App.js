import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { StrictMode, useState } from 'react';

import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';
import Advertising from "./components/Advertising"
import ChangePassword from './components/ChangePassword';
import Redirect from './components/Redirect';

import ApiController from './services/ApiController';


function App() {

    const [API, setAPI] = useState(() => {
        let result = JSON.parse(sessionStorage.getItem("API"));
        if (!result) {
            return new ApiController("https://localhost:7121/api/");
        } else {
            return new ApiController(result.API_URL, result.AccessToken, result.isLogin);
        }
    });

    async function Auth(login, password)
    {
        await API.Login(login, password);
        sessionStorage.setItem("API", JSON.stringify(API));

        let new_state = new ApiController(API.API_URL, API.AccessToken, API.isLogin);
        setAPI(new_state);
    }

    if (API.isLogin) {
        return (
            <StrictMode>
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path='projects' element={<Projects API={API} />} />
                            <Route path='advertising' element={<Advertising API={API} />} />
                            <Route path="change_password" element={<ChangePassword API={API} />} />
                            <Route path='' element={<Redirect to="projects" />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </StrictMode>
        );
    } else {

        console.log(API);
        console.log(Auth);
        return (
            <StrictMode>
            <div className="App">
                <Login Auth={Auth} />
            </div>
            </StrictMode>
        )
    }
}

export default App;
