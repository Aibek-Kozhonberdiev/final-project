import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../..//components/Button';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions.js'
import { useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData;

    dispatch(login(username, password));
  };
  const state = useSelector(state => state);

console.log(state);

  return (
    <section className='login'>
      <div className='login__container container'>
        <h2 className='section__title'>Авторизация</h2>
        <p className='section__subtitle'>Введите ваш логин и пароль</p>

        <div className='login__wrapper'>
          <form action='' className='login__form'>
            <div className='login__input'>
              <label htmlFor='username'>Введите логин: </label>
              <input
                type='text'
                placeholder='логин'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className='login__input'>
              <label htmlFor='password'>Введите пароль: </label>
              <input
                type='password'
                placeholder='ваш пароль'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className={'login__btn'}
              text={'Авторизоваться'}
            />
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
