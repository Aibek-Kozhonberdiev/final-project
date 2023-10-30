import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './quizzes.css';
import axios from 'axios';
import Quiz from '../../components/Quiz';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  const openQuiz = () => {
    setIsOpen(!isOpen)
  }

  const fetchQuizzes = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/v1/quizzes/';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios(apiUrl, { headers });
      if (response.status === 200) {
        setQuizzes(response.data.results);
        console.log(response.data.results);
      } else {
        console.error('Ошибка при получении данных:', response.status);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <section className='quizzes section'>
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
            <Button text={'Создать'} />
          </div>
        </div>
        <div className='quizzes__list'>
          {quizzes.map((el) => (
            <Quiz el={el} onClick={openQuiz} isOpen/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quizzes;
