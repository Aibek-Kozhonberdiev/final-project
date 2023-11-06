import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import { useDispatch } from 'react-redux';
import { AddRoomId } from '../../actions/quizzesActions';
import { useSelector } from 'react-redux';

const AddRoom = ({ isOpen, setIsOpen }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const quizzes = JSON.parse(localStorage.getItem('quizzes'))

  const userId = parseInt(localStorage.getItem('userId'));
  const data = {
    name: title,
    status: 'pendeng',
    quizzes: selectedQuiz,
    members: [userId],
  };

  const handleSelectChange = (e) => {
    setSelectedQuiz(e.target.value);
    console.log(typeof selectedQuiz)
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const postRoom = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/rooms/';

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(apiUrl, data, { headers });
      setIsOpen(!isOpen)
      dispatch(AddRoomId(response.data.id))
      localStorage.setItem('roomId',response.data.id)

    } catch (error) {
      console.error('Ошибка:', error);
      if (error.response.data.detail === 'The user is already in another room.') {
        alert("Вы уже состоите в комнате")
      }
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
            <select name='quizzes' id='quizzes' onClick={handleSelectChange}>
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
