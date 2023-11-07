import React, {useState, useEffect} from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Notification = ({ nextQuestion }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const lobby = JSON.parse(localStorage.getItem('lobby'));
  const [points,setPoints] =useState(0)

  const getPoints = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = `http://aiba23334.pythonanywhere.com/api/users/${userId}/`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios(apiUrl, { headers });
      if (response.status === 200) {
        setPoints(response.data.profile.point)
      } else {
        console.error('Ошибка при получении данных:', response.status);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    getPoints();
  }, []);
  


  return (
    <div className='notification section'>
      <div className='container'>
        <h2 className='section__title'>Result</h2>
        <p className='section__subtitle'>кто был прав?</p>

        <div className='notification__wrapper'>
        {lobby.members.map((member)=> (
          <p className='notification__gamer'>Участник {member}: {points}</p>
          ))}

          <NavLink to='/game' className='header__link'>
          <Button
            text='next question'
            className={'notification__btn'}
            onClick={nextQuestion}
          />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Notification;
