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
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openQuiz = () => {
    setIsOpen(!isOpen);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    try {
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/quizzes/';

      const response = await axios(apiUrl);
      if (response.status === 200) {
        dispatch(addQuizzes(response.data.results));
        localStorage.setItem('quizzes', JSON.stringify(response.data.results));
        console.log(response.data.results);
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
  }, []);

  const [isMyQuizzes, setIsMyquizzes] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId'));

  const myQuizzes = quizzes.filter((quiz) => quiz.user === userId);
  console.log(myQuizzes);

  const handleMyQuizzes = (e) => {
    if (e.target.value === 'мои квизы') {
      setIsMyquizzes(true);
    }else {
      setIsMyquizzes(false);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery)
  };
  
  const filteredQuizzes = isMyQuizzes
  ? (myQuizzes || []).filter((quiz) => quiz.title && quiz.title.toLowerCase().includes(searchQuery.toLowerCase()))
  : (quizzes || []).filter((quiz) => quiz.title && quiz.title.toLowerCase().includes(searchQuery.toLowerCase()));
console.log(isMyQuizzes)
  return (
    <section className='quizzes section' id='#quizzes'>
      <div className='container'>
        <h2 className='section__title'>Все квизы </h2>
        <p className='section__subtitle'>Список всех квизов</p>

        <div className='quizzes_filters'>
          <Input
            className={'quizzes__input'}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />

          <select className='quizzes__select' name='Категория' id=''>
            <option>категория</option>
            <option>категория</option>
            <option>категория</option>
          </select>

          <select className='quizzes__select' onChange={handleMyQuizzes}>
            <option>все квизы</option>
            <option>мои квизы</option>
          </select>

          <div className='quizzes__btns'>
            <Button onClick={openModal} text={'Создать'} />
          </div>
          <QuizModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </div>
        <div className='quizzes__list'>
        {filteredQuizzes.map((el, idx) => (
  <Quiz key={idx} el={el} onClick={openQuiz} isOpen={isOpen} />
))}
        </div>
      </div>
    </section>
  );
};

export default Quizzes;
