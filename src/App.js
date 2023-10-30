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
import Quiz from './components/Quiz';
import axios from 'axios';
import refreshTokensThunk from './reducers/tokenRefreshReducer';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios('http://aiba23334.pythonanywhere.com/api/token/verify/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: localStorage.getItem('accessToken')
          })
        });
  
        if (response) {
          console.log('The token still ok!')
        } else {
          refreshTokensThunk()
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    
    verifyToken();
  }, []);

  return (
    <div className='App'>
      {isAuth ? (
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/quizzes' element={<Quizzes />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/lobby' element={<Lobby />} />
            <Route path='/game' element={<Game />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
