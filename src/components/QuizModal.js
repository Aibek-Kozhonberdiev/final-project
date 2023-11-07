import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

const QuizModal = ({ modalIsOpen, closeModal}) => {
  const [quizData, setQuizData] = useState({
    title: '',
    category: {},
    description: '',
  });
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const getCurrentTimeInDesiredFormat = () => {
    const now = moment();
    const formattedTime = now.format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    return formattedTime;
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const adminAccessToken = localStorage.getItem('adminAccessToken')
      const userId = localStorage.getItem('userId');
      const dateTime = getCurrentTimeInDesiredFormat();
      console.log(category);
      const response = await axios(
        'http://aiba23334.pythonanywhere.com/api/quizzes/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          data: {
            update: `${dateTime}`,
            category: {
              name: `${category}`,
            },
            title: `${title}`,
            content: `${description}`,
            user: `${userId}`,
          },
        }
      );

      setQuizData((quizData.quizId = response?.data?.id));

      closeModal();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    modalIsOpen && (
      <Modal
        isOpen={modalIsOpen}
        
        className={'quizzes__modal'}>
        <div className='container'>
          <h2 className='section__title quizzes__title-modal'>
            Создание квиза
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
            <div className='quizzes__input-form'>
              <input
                type='text'
                name='category'
                onChange={handleCategory}
                placeholder='category'
              />
            </div>
            <div className='quizzes__input-form'>
              <textarea
                name='description'
                onChange={handleDescription}
                placeholder='Description'
              />
            </div>
            <button onClick={handleCreateQuiz}>Создать</button>

          </form>
        </div>
      </Modal>
    )
  );
};

export default QuizModal;
