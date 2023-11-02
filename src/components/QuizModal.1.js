import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export const QuizModal = ({ modalIsOpen, closeModal }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    category: {},
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setQuizData((prevData) => ({
      ...prevData,
      [name]: name === 'category' ? { name: value } : value,
    }));
  };
  const dateTime = new Date();

  const handleCreateQuiz = async () => {
    try {
      console.log(`quiz before ${quizData}`);

      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/v1/quizzes/';

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(
        apiUrl,
        {
          update: dateTime,
          title: quizData.title,
          category: quizData.category,
          userId: userId,
        },
        { headers }
      );
      setQuizData(...quizData, (quizData.quizId = response.data.id));
      console.log(`quiz after ${quizData}`);

      closeModal();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    modalIsOpen && (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
                onChange={handleInputChange}
                placeholder='Title'
              />
            </div>
            <div className='quizzes__input-form'>
              <input
                type='text'
                name='category'
                onChange={handleInputChange}
                placeholder='category'
              />
            </div>
            <div className='quizzes__input-form'>
              <textarea
                name='description'
                onChange={handleInputChange}
                placeholder='Description'
              />
            </div>
            <button onClick={handleCreateQuiz}>Создать вопросы</button>
          </form>
        </div>
      </Modal>
    )
  );
};
