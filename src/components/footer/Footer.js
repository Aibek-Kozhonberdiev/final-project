import React, {useState} from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';


const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__logo'>
          <p className='header__logo'>QUIZ</p>
          <p className='section__subtitle'>Присоединяйся к игре!</p>
        </div>
        <nav className="footer__nav">
        <NavLink to='/quizzes' className='header__link'>
            Все квизы
          </NavLink>
          <NavLink to='/rooms' className='header__link'>
            Комнаты
          </NavLink>
          <NavLink to='/users' className='header__link'>
            Юзеры
          </NavLink>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
