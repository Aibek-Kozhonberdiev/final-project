import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './users.css'

const Users = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const apiUrl = 'http://aiba23334.pythonanywhere.com/api/users/';
    
          const response = await axios(apiUrl);
          if (response.status === 200) {
            setUsers(response.data.results);

          } else {
            console.error('Ошибка при получении данных:', response.status);
          }
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };
    
      useEffect(() => {
        getUsers();
      }, [users]);
      console.log(users)
  return (
    <div className='section'>
      <div className='container'>
        <h2 className='section__title'>Все юзеры</h2>
        <div className="users__wrapper">
{users?.map((user, idx) => 
    <div className="users__user" key={idx}>

        <div className="users__img">
            <img src={user.userprofile.avatar} alt="" />
        </div>
        <p className="users__name">Логин: {user.username}</p>
        <p className="users__id">ID: {user.userprofile.id}</p>
        <p className="users__id">Игр сыграно: {user.userprofile.number_of_completed_games}</p>
        <p className="users__id">{user.userprofile.phone}</p>
    </div>
)}
</div>
      </div>
    </div>
  );
};

export default Users;
