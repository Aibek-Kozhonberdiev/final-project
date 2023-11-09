import React, {useState} from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';
import Complaint from './Complaint';

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
          <p className='section__subtitle'>Enjoy with friends!</p>
        </div>
        <nav className="footer__nav">
        <NavLink to='/quizzes' className='header__link'>
            Все квизы
          </NavLink>
          <NavLink to='/rooms' className='header__link'>
            Комнаты
          </NavLink>


          <NavLink className='header__link' onClick={handleModal}>
            Оставить отзыв
          </NavLink>
        </nav>
        <Complaint isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </footer>
  );
};

export default Footer;
