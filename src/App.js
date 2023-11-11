import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import axios from 'axios';
import { startRefreshToken } from './reducers/tokenRefreshReducer';
import CreateQuestions from './pages/quizzes/CreateQuestions';
import Notification from './components/Notification.js';
import { login } from './actions/authActions.js';
import Footer from './components/footer/Footer.js';
import Users from './pages/users/Users.js';

function App() {
  const dispatch = useDispatch();
  dispatch(login('root', 'aibek_admin'));
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await axios.post(
          'http://aiba23334.pythonanywhere.com/api/token/verify/',
          {
            token: accessToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.log(error.response.data.code === 'token_not_valid');

        if (error.response.data.code === 'token_not_valid') {
          console.log('токен недействителен');
          startRefreshToken(dispatch);
        }
      }
    };

    if (isAuth) {
      verifyToken();
    }
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
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/lobby' element={<Lobby />} />
            <Route path='/game' element={<Game />} />
            <Route path='/create-questions' element={<CreateQuestions />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/users' element={<Users />} />

          </Routes>
          <Footer/>
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
