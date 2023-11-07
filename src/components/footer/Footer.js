import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='section footer'>
      <div className='container footer__container'>
        <div className='footer__logo'>
          <p className='header__logo'>QUIZ</p>
          <p className='section__subtitle'>Enjoy with friends!</p>
        </div>
        <nav className="footer__nav">
        <NavLink to='/quizzes' className='header__link'>
            Все квизы
          </NavLink>
          <NavLink to='/rooms' className='header__link'>
            Комнаты
          </NavLink>


          <NavLink to='/' className='header__link'>
            Оставить отзыв
          </NavLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
