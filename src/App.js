import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';
import Advertising from "./components/Advertising"
import ChangePassword from './components/ChangePassword';
import { useState } from 'react';

import ApiController from './services/ApiController';
import { useEffect } from 'react';


function App() {

    const [API, setAPI] = useState(new ApiController("https://localhost:7166/api/"));
    const [isLogin, setIsLogin] = useState(false);

    async function Auth(login, password) {
        await API.Login(login, password);
        setIsLogin(API.isLogin);
    }

    if (isLogin) {
        return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path='/'>
                            <Route path="projects" element={<Projects API={API}/>} />
                            <Route path='advertising' element={<Advertising API={API}/>} />
                            <Route path="change_password" element={<ChangePassword API={API}/>} />
                        </Route>
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
