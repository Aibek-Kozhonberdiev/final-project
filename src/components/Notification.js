import React, {useState, useEffect} from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Notification = ({ nextQuestion }) => {
    localStorage.removeItem('currentQuestionIndex')

  const userId = JSON.parse(localStorage.getItem('userId'));
  const lobby = JSON.parse(localStorage.getItem('lobby'));
  const [points,setPoints] = useState(0)
  const [users,setUsers] = useState([])

  const getPoints = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = `http://aiba23334.pythonanywhere.com/api/users/`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(apiUrl, { headers });

        setUsers(response.data.results)

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
        <h2 className='section__title'>Результаты игры</h2>
        <p className='section__subtitle'>Общее количество баллов по всем участникам</p>

        <div className='notification__wrapper'>
        {users.map((user, idx)=> (
          <p className='notification__gamer'>Участник {user.id}: {user.userprofile.point}</p>
          ))}


        </div>
      </div>
    </div>
  );
};

export default Notification;
