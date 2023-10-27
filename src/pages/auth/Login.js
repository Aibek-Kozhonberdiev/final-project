import React from 'react';
import Input from '../../components/Input';
import Button from '../..//components/Button';
import { NavLink } from 'react-router-dom';


const Login = () => {
  return (
    <section className='login'>
      <div className='login__container container'>
        <h2 className='section__title'>Авторизация</h2>
        <p className='section__subtitle'>Введите ваш логин и пароль</p>

        <div className='login__wrapper'>
          <form action='' className='login__form'>
            <div className='login__input'>
                <label htmlFor="">Введите логин: </label>
              <input type='text' placeholder='логин'/>
            </div>

            <div className='login__input'>
            <label htmlFor="">Введите пароль: </label>
              <input type='password' placeholder='ваш пароль' />
            </div>

            <Button className={'login__btn'} text={'Авторизоваться'} />
            <NavLink to='/signin' className='login__link'>
            У меня нет аккаунта
          </NavLink>
          </form>


        </div>
      </div>
    </section>
  );
};

export default Login;
