import React from 'react';
import Button from '../../components/Button.js';
import './home.css';
import { useSelector } from 'react-redux';
import Login from '../auth/Login.js';
import { NavLink } from 'react-router-dom';
import Form from '../../components/Complaint.js';

const Home = () => {
  const isAuth = useSelector((state) => (state.auth.isAuth));

  return (
    isAuth ? (
      <div>
    <main className='main'>
      <div className='container main__wrapper'>
        <div className='main__desc'>
          <h1 className='main__title'>
            Создавай квиз и играй вместе с друзьями!
          </h1>
          <p className='main__subtitle'>
            Придумай вопросы и присоединяйся к комнате
          </p>
          <div className='main__buttons'>
          <NavLink to='/lobby' className='header__link'>
            <Button text={'Играть'} className={'header__btn'}/>
          </NavLink>

          </div>
        </div>

        <div className='main__images'>
          <div className='main__images-left'>
            <div className='main__image main__image-skull'>
              <img
                src='https://i0.wp.com/producete.com/wp-content/uploads/2022/01/abhipsa-pal-ILra9AOaXOE-unsplash.jpg?w=1920&ssl=1'
                alt=''
              />
            </div>

            <div className='main__image main__image-middle'>
              <img
                src='https://intellectual-property-helpdesk.ec.europa.eu/sites/default/files/styles/oe_theme_medium_2x_no_crop/public/2023-10/shubham-dhage-Hatkch_piQM-unsplash.jpg?itok=cEQMRhyA'
                alt=''
              />
            </div>

            <div className='main__image main__image-camera'>
              <img
                src='https://img.freepik.com/free-photo/old-vintage-camera-on-old-books-on-wooden-background-old-vintage-holiday-concept_1220-1115.jpg?w=1480&t=st=1698425504~exp=1698426104~hmac=2712dd4db7ea4d4caafe34d4d6e3e8ed4b074f3f8ed7f7e5cc9de4fdb08358a3'
                alt=''
              />
            </div>
          </div>
          <div className='main__images-center'>
            <div className='main__image main__image-light'>
              <img
                src='https://images.unsplash.com/photo-1697895648538-0117b2383a03?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
              />
            </div>

            <div className='main__image main__image-middle'>
              <img
                src='https://i0.wp.com/producete.com/wp-content/uploads/2022/01/fakurian-design-58Z17lnVS4U-unsplash.jpg?w=1920&ssl=1' alt=''
              />
            </div>

            <div className='main__image main__image-woman'>
              <img
                src='https://images.unsplash.com/photo-1697566947661-4763f619ec0b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt=''
              />
            </div>
          </div>
          <div className='main__images-right'>
            <div className='main__image main__image-man'>
              <img
                src='https://insync-corp.com/wp-content/uploads/2022/12/Rectangle-21.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>

      <Form />

    </main>
      </div>
    ) : <Login /> 

  );
};

export default Home;
