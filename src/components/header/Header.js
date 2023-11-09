import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'
import Button from '../Button';
import HeaderMobile from './HeaderMobile';


const Header = () => {

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


       <NavLink to='/lobby' className='header__link'>
            <Button text={'Играть'} className={'header__btn'}/>
          </NavLink>
        </nav>
        <HeaderMobile />


      </div>
    </header>
  );
};

export default Header;