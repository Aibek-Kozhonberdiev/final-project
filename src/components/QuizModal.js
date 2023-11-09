import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

const QuizModal = ({ modalIsOpen, closeModal }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    category: {},
    description: '',
  });
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const [description, setDescription] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  

  const getCurrentTimeInDesiredFormat = () => {
    const now = moment();
    const formattedTime = now.format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    return formattedTime;
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const adminAccessToken = localStorage.getItem('adminAccessToken');
      const userId = localStorage.getItem('userId');
  
      // Создание новой категории
      const categoryResponse = await axios(
        'http://aiba23334.pythonanywhere.com/api/categories/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          data: {
            name: category,
          },
        }
      );
  
      const categoryId = categoryResponse.data.id;
  
      // Создание нового квиза
      const dateTime = getCurrentTimeInDesiredFormat();
  
      const formData = new FormData();
      formData.append('update', dateTime);
      formData.append('category', category);
      formData.append('title', title);
      formData.append('content', description);
      formData.append('user', userId);
      formData.append('cat', categoryId);
  
      // Добавьте файл к данным формы
      if (file) {
        formData.append('img', file);
        console.log('файл есть')
      }
  
      const response = await axios.post('http://aiba23334.pythonanywhere.com/api/quizzes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Указываем правильный тип контента
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
  
      setQuizData((quizData.quizId = response?.data?.id));
      closeModal();
    } catch (error) {
      console.error('Ошибка:', error);
      // Добавьте обработку ошибок, например, показ сообщения об ошибке
    }
  };

  return (
    modalIsOpen && (
      <Modal isOpen={modalIsOpen} className={'quizzes__modal'}>
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
            <div className='quizzes__input-form'>
              <input type='file' accept='image/*' onChange={handleFileChange} />
            </div>
            <button onClick={handleCreateQuiz}>Создать</button>
          </form>
        </div>
      </Modal>
    )
  );
};

export default QuizModal;
