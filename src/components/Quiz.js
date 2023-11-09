import React, { useState } from 'react';
import '../pages/quizzes/quizzes.css';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import CreateQuestions from '../pages/quizzes/CreateQuestions';

const Quiz = ({ el }) => {
  const [qModalIsOpen, setQModalIsOpen] = useState('');
  const [myQuiz, setMyquiz] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId'));
  const quizzes = JSON.parse(localStorage.getItem('quizzes'));
  // if (el.user === userId) {
  //   setMyquiz(true)
  // }

  const handleAddQustions = () => {
    setQModalIsOpen(!qModalIsOpen);
  };
  console.log(el);

  return (
    <div className='quizzes__item'>
      <h3 className='quizzes__item-name'>{el.title}</h3>
      <div className='quizzes__content'>
        <div className='quizzes__img'>
          <img src={el.img} alt='' />
        </div>
        <div className='quizzes__desc'>
          <p>{el.content}</p>
          <p>Категория: {el?.category?.name}</p>
          <p>Кол-во вопросов: {el.question}</p>
          <div className='quizzes__questions'>
        {el.question_set.map((question, idx) => (
          <div className='quizzes__questions'>
            <p key={idx}>{`${idx + 1}: ${question.text}`}</p>
          </div>
        ))}
      </div>
        </div>
      </div>


      {el.user === userId ? (
        <button
          onClick={() => {
            handleAddQustions();
          }}>
          добавить вопросы
        </button>
      ) : null}
      <CreateQuestions isOpen={qModalIsOpen} id={el.id} />
    </div>
  );
};

export default Quiz;
