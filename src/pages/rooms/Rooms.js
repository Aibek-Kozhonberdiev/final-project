import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import './rooms.css';
import Button from '../../components/Button.js';
import Room from '../../components/room/Room';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/v1/rooms/';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios(apiUrl, { headers });
      if (response.status === 200) {
        setRooms(response.data.results);
        console.log(response.data.results);
      } else {
        console.error('Ошибка при получении данных:', response.status);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <section className='rooms section'>
      <div className='container'>
        <h2 className='section__title'>Комнаты</h2>
        <p className='section__subtitle'>Выберите комнату</p>

        <div className='rooms_filters'>
          <Input className={'rooms__input'} />

          <div className='rooms__btns'>
            <Button text={'Создать'} />
          </div>
        </div>

        <div className='rooms__list'>
          {rooms.map((room, idx) => (
            <Room room={room} key={idx}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
