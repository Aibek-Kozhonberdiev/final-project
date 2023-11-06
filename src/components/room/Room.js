import React from 'react';
import Button from '../Button.js';
import './room.css';
import axios from 'axios';

const Room = ({room}) => {
  const userId = parseInt(localStorage.getItem('userId'))


  const data = {
    name: room.name,
    status: room.status,
    members: room.members
  }
  
  const handleJoin =async(e) => {
    e.preventDefault()
    if (!room.members.includes(userId)) {

      data.members.push(userId);
    }
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.patch(`http://aiba23334.pythonanywhere.com/api/rooms/${room.id}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Успешно обновлено:', response.data);
    } catch (error) {
      
      console.error('Ошибка:', error);
    }

    console.log(data)
  }
  return (
    <div className='rooms__card'>
      <div className='rooms__image'>
        {/* <img src={photo.url} alt={photo.title} /> */}
      </div>
      <div className='rooms__desc'>
        <p className='rooms__name'>Название комнаты: {room.name}</p>
      </div>
      <Button text={'Присоединиться'} className={'collection__btn'} onClick={handleJoin}/>
    </div>
  );
};

export default Room;
