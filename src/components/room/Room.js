import React from 'react';
import Button from '../Button.js';
import './room.css';

const Room = ({room}) => {
  return (
    <div className='rooms__card'>
      <div className='rooms__image'>
        {/* <img src={photo.url} alt={photo.title} /> */}
      </div>
      <div className='rooms__desc'>
        <p className='rooms__name'>Название комнаты: {room.name}</p>
      </div>
      <Button text={'Присоединиться'} className={'collection__btn'} />
    </div>
  );
};

export default Room;
