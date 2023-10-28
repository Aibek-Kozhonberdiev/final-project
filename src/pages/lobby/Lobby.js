import React from 'react';
import './lobby.css';
import Button from '../../components/Button';
import { NavLink } from 'react-router-dom';

const Lobby = () => {
  return (
    <section className='section lobby'>
      <div className='container'>
        <h2 className='section__title'>Название лобби</h2>
        <p className='section__subtitle'>Подготовка к игре</p>
        <div className='lobby__wrapper'>
          <div className='lobby__img'>
            <img
              src='https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Lobby image'
            />
          </div>
          <p className='lobby__gamers'>Кол-во игроков: 1</p>
          <div className='lobby__quizzes'>
            <label className='lobby_label' htmlFor=''>
              Выберите квиз:
            </label>
            <select className='lobby__select' name='' id=''>
              <option value=''>1</option>
            </select>
          </div>

          <NavLink to='/game' className='header__link'>
            <Button
              text={'Играть'}
              className={'header__btn lobby__btn'}/>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Lobby;
