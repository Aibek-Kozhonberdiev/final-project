import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'
import Button from '../Button';


const Header = () => {
  const lobby = localStorage.getItem('lobby')
  return (
    <header className='header'>
      <div className='container header__wrapper'>
        <NavLink to='/' className='header__link header__logo'>
          <p className='header__logo'>QUIZ</p>
        </NavLink>

        <nav className='header__nav'>
          <NavLink to='/quizzes' className='header__link'>
            Все квизы
          </NavLink>
          <NavLink to='/rooms' className='header__link'>
            Комнаты
          </NavLink>


         {lobby && <NavLink to='/lobby' className='header__link'>
            <Button text={'Играть'} className={'header__btn'}/>
          </NavLink>}

        </nav>


      </div>
    </header>
  );
};

export default Header;