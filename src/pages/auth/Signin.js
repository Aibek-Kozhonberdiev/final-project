import React, { useState } from 'react';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions.js';
import axios from 'axios';

const Signin = () => {
  
  const dispatch = useDispatch();
  dispatch(login('root', 'aibek_admin'));
  const adminAccessToken = localStorage.getItem('adminAccessToken')

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://aiba23334.pythonanywhere.com/api/users/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      console.log('Успешно обновлено:', response.data);
      const { username, password } = formData;
      dispatch(login(username, password));
    } catch (error) {
      
      console.error('Ошибка:', error);
    }
    
  };
  return (
    <section className='login'>
      <div className='login__container container'>
        <h2 className='section__title'>Регистрация</h2>
        <p className='section__subtitle'>Придумайте логин и пароль</p>

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
            <div className='login__input'>
              <label htmlFor='password'>Подтвердите пароль: </label>
              <input
                type='password'
                placeholder='повторите пароль'
                name='password2'
                value={formData.checkPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className='login__input'>
              <label htmlFor='password'>Введите почту: </label>
              <input
                type='email'
                placeholder='введите e-mail'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className={'login__btn'}
              text={'зарегистрироваться'}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
