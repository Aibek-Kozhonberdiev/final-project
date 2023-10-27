import React from 'react';
import Input from '../components/Input';
import './rooms.css';
import Button from '../components/Button.js';
import Room from '../components/Room';

const Rooms = () => {
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
            <Room />
        </div>
      </div>
    </section>
  );
};

export default Rooms;
