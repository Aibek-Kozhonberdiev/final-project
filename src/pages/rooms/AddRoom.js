import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import { useSelector } from 'react-redux';

const AddRoom = ({ isOpen, setIsOpen }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [title, setTitle] = useState('');
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const userId = parseInt(localStorage.getItem('userId'));
  const data = {
    name: title,
    status: 'pendeng',
    quizzes: selectedQuiz,
    members: [userId],
  };

  const handleSelectChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const postRoom = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/v1/rooms/';

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(apiUrl, data, { headers });
      setIsOpen(!isOpen)
      console.log(response.data);
      
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  return (
    isOpen && (
      <Modal isOpen={isOpen} className={'quizzes__modal'}>
        <div className='container'>
          <h2 className='section__title quizzes__title-modal'>
            Создание комнаты
          </h2>
          <form className={'quizzes__modal-form'}>
            <div className='quizzes__input-form'>
              <input
                type='text'
                name='title'
                onChange={handleTitle}
                placeholder='Title'
              />
            </div>
            <select name='quizzes' id='quizzes' onChange={handleSelectChange}>
              {quizzes.map((quiz) => (
                <option value={quiz.id}>{quiz.title}</option>
              ))}
            </select>
          </form>
          <button onClick={postRoom}>Создать</button>
        </div>
      </Modal>
    )
  );
};

export default AddRoom;
