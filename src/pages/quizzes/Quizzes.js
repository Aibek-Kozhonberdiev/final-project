import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './quizzes.css';
import axios from 'axios';
import Quiz from '../../components/Quiz';
import QuizModal from '../../components/QuizModal.js';

import { useDispatch } from 'react-redux';
import { addQuizzes } from '../../actions/quizzesActions.js';
import { useSelector } from 'react-redux';



const Quizzes = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openQuiz = () => {
    setIsOpen(!isOpen)
  }
  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/v1/quizzes/';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios(apiUrl, { headers });
      if (response.status === 200) {
        dispatch(addQuizzes(response.data.results))
      
      } else {
        console.error('Ошибка при получении данных:', response.status);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  useEffect(() => {
    fetchQuizzes();
  }, [quizzes]);



  return (
    <section className='quizzes section' id='#quizzes'>
      <div className='container'>
        <h2 className='section__title'>Все квизы </h2>
        <p className='section__subtitle'>Список всех квизов</p>

        <div className='quizzes_filters'>
          <Input className={'quizzes__input'} />

          <select className='quizzes__select' name='Категория' id=''>
            <option>категория</option>
            <option>категория</option>
            <option>категория</option>
          </select>

          <select className='quizzes__select' name='author' id=''>
            <option>автор</option>
            <option>автор</option>
            <option>автор</option>
          </select>

          <div className='quizzes__btns'>
            <Button onClick={openModal} text={'Создать'} />
          </div>
          <QuizModal modalIsOpen={modalIsOpen} closeModal={closeModal}/>
        </div>
        <div className='quizzes__list'>
          {quizzes.map((el, idx) => (
            <Quiz key={idx} el={el} onClick={openQuiz} isOpen={isOpen} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quizzes;
