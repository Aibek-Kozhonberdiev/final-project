import React, { useState } from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions.js';
import axios from 'axios';

const Signin = () => {
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('false');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    code: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const getConfirmation = async (userId) => {

    const adminAccessToken = localStorage.getItem('adminAccessToken');
    localStorage.setItem('userId', userId);
    try {
      const response = await axios(
        `http://aiba23334.pythonanywhere.com/api/user-confirmation/${userId}/`
      );


    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  const sendCode = async (e) => {
    e.preventDefault();

    const adminAccessToken = localStorage.getItem('adminAccessToken');
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(
        `http://aiba23334.pythonanywhere.com/api/user-confirmation/${userId}/`,
        { key: formData.code },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );

      setIsConfirmed(true);
      localStorage.setItem('isConfirmed', true);
      const { username, password } = formData;
      dispatch(login(username, password));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleSubmit = async (event) => {
    const adminAccessToken = localStorage.getItem('adminAccessToken');
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://aiba23334.pythonanywhere.com/api/users/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );

      const userId = response.data.user.id;
      getConfirmation(userId);

      setIsRegistered(true);
    } catch (error) {
      console.error('Ошибка:', error);
      setError(error.responce.data);
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
            <p className='section__subtitle'>
              На ваш почтовый адрес придет код для подтверждения аккаунта
            </p>

            {isRegistered ? (
              <>
                
                <div className='signin__confirm login__input'>
                  <label htmlFor='password'>Введите код: </label>
                  <input
                    type='code'
                    placeholder='введите полученный код'
                    name='code'
                    value={formData.code}
                    onInput={handleInputChange}
                  />
                </div>
                <Button
                  onClick={sendCode}
                  className={'login__btn'}
                  text={'Подтвердить код'}
                />
              </>
            ) : (
              <Button
                onClick={handleSubmit}
                className={'login__btn'}
                text={'зарегистрироваться'}
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
