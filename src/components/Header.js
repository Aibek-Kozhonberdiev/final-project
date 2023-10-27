import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header className='header'>
      <div className='container header__wrapper'>
        <NavLink to='/' className='header__link header__logo'>
        </NavLink>

        <nav className='header__nav'>
          <NavLink to='/quizzes' className='header__link'>
            Все квизы
          </NavLink>
          <NavLink to='/rooms' className='header__link'>
            Комнаты
          </NavLink>


          <NavLink to='/cart' className='header__link'>
            
          </NavLink>
        </nav>


      </div>
    </header>
  );
};

export default Header;