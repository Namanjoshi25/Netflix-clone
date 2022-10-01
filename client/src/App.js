 import './App.scss';
import Home from './main pages/Home';

import Register from './main pages/Register';
import Login from './main pages/Login';
import Video from './main pages/Video';
import { AuthContext } from "./context/authContext/AuthContext";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useContext } from 'react';



function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
    <Routes>
      
        <Route exact path='/' element={ user ?<Home /> : <Register/>} />
        <Route exact path='/register' element={ !user ?<Register /> : <Home/>} />
        <Route exact path='/login' element={!user ?<Login /> : <Home/>} />
        
        { user && (
          <>
          <Route path="/movies" element={<Home type="movie" />} />
        <Route path="/series" element={<Home type="series" />} />
        <Route path="/video" element={<Video />} />
        </>
        )
     }
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;
