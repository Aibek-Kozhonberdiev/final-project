import React, { useState } from 'react';
import Modal from 'react-modal';

const QuizModal = ({ modalIsOpen, closeModal }) => {
  const [quizData, setQuizData] = useState({
    name: '',
    category: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleCreateQuiz = () => {
    // Здесь quizData содержит данные, которые нужно отправить на сервер

    
  };

  return (
    modalIsOpen && (
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={'quizzes__modal'}        // Укажите стили и другие параметры для модального окна
      >
        <div className="container">
        <h2 className='section__title quizzes__title-modal'>Создание квиза</h2>
        <form className={'quizzes__modal-form'}>
          <div className='quizzes__input-form'>
            <input
              type='text'
              name='name'
              value={quizData.name}
              onChange={handleInputChange}
              placeholder='Title'
            />
          </div>
          <div className='quizzes__input-form'>
            
            <input
              type='text'
              name='category'
              value={quizData.category}
              onChange={handleInputChange}
              placeholder='category'
            />
          </div>
          <div className='quizzes__input-form'>
            
            <textarea
              name='description'
              value={quizData.description}
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

export default QuizModal;
