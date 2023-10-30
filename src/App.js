import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkToken, refreshTokens } from './actions/authActions';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.js';
import Home from './pages/home/Home';
import Rooms from './pages/rooms/Rooms';
import Quizzes from './pages/quizzes/Quizzes';
import Login from './pages/auth/Login';
import Signin from './pages/auth/Signin';
import Lobby from './pages/lobby/Lobby';
import Game from './pages/game/Game';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(checkToken()); 
    }
  }, [isAuth, dispatch]);

  return (
    <div className="App">
      <Router>
          <Header />
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/quizzes' element={<Quizzes />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/lobby' element={<Lobby />} />
            <Route path='/game' element={<Game />} />
          </Routes>

        </Router>
    </div>
  );
}

export default App;
