import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const accessToken = localStorage.getItem('accessToken');
  const apiUrl = 'http://aiba23334.pythonanywhere.com/api/v1/rooms';

  const requestData = {
    name: `${name}`,
    status: 'pendeng',
    question: 1,
    quizzes: 1, // Пример значения типа integer
    members: [1], // Пример массива с уникальными значениями integer
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  axios
    .post(apiUrl, requestData, { headers })
    .then((response) => {
      console.log('Успешно выполнен POST-запрос:', response);
    })
    .catch((error) => {
      console.error('Ошибка при выполнении POST-запроса:', error);
    });

  return (
    <div>
      AddRoom
      {/* {
    "name": "testroom",
    "status": "pendeng",
    "question": "2",
    "quizzes": "1",
    "members": [1]
} */}
    </div>
  );
};

export default AddRoom;
