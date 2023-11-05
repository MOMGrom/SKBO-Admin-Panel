import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';
import NavBar from "./components/NavBar"
import Advertising from "./components/Advertising"
import ChangePassword from './components/ChangePassword';


function App() {
  
  
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route path='/'>
          <Route path='login' element={<Login/>}/>
          <Route path="projects" element={<Projects/>}/>
          <Route path='advertising' element={<Advertising/>}/>
          <Route path="change_password" element={<ChangePassword/>}/>
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
