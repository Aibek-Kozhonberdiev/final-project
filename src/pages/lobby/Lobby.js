import React, { useState, useEffect } from 'react';
import './lobby.css';
import Button from '../../components/Button';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Lobby = () => {

  // useEffect(() => {
  //   const ws = new WebSocket(`wss://aiba23334.pythonanywhere.com/api/rooms/rooms_websocket`);
  
  //   // Set up event handlers
  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //   };
  //   ws.onerror = (error) => {
  //     console.error(error);
  //   };
  
  //   ws.onmessage = (event) => {
  //     const jsonData = JSON.parse(event.data);
  //     // Handle incoming WebSocket messages as needed
  //     console.log('Received message:', jsonData);
  //   };
  
  //   ws.onclose = () => {
  //     console.log('WebSocket closed');
  //   };
  
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const roomId = parseInt(localStorage.getItem('roomId'));
  const accessToken = localStorage.getItem('accessToken');
  const quizzes = JSON.parse(localStorage.getItem('quizzes'));
  const [lobby, setLobby] = useState({});

  const getLobby = async () => {
    try {
      const apiUrl = `http://aiba23334.pythonanywhere.com/api/rooms/${roomId}/`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      const response = await axios(apiUrl, { headers });
      if (response.status === 200) {
        setLobby(response.data);
      } else {
        console.error('Ошибка при получении данных:', response.status);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    getLobby();
  }, []);
  
  const quiz = quizzes.find((quiz) => quiz.id === lobby.quizzes);
  const quizName = quiz?.title;
  const adminAccessToken = localStorage.getItem('adminAccessToken')

  const startGame = async() => {
    try {
      const apiUrl = `http://aiba23334.pythonanywhere.com/api/rooms/${roomId}/`;
    
      const response = await axios.patch(apiUrl, {
        id: roomId,
        members: lobby.members,
        name: lobby.name,
        password: null,
        private: lobby.private,
        quizzes: lobby.quizzes,
        status: "in progress",
      }, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
    
    } catch (error) {
      console.error('Ошибка:', error);
    }
   
  };
  return (
    <section className='section lobby'>
      <div className='container'>
        <h2 className='section__title'>{lobby?.name}</h2>
        <p className='section__subtitle'>Подготовка к игре</p>
        <div className='lobby__wrapper'>
          <div className='lobby__img'>
            <img
              src='https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Lobby image'
            />
          </div>
          <p className='lobby__gamers'>
            Кол-во игроков: {lobby?.members?.length}
          </p>
          <div className='lobby__quizzes'>
            <p>Выбранный квиз: {quizName}</p>
          </div>

          <NavLink to='/game' className='header__link' onClick={startGame}>
            <Button text={'Играть'} className={'header__btn lobby__btn'} />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Lobby;
