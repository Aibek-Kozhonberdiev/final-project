import React from 'react';
import '../pages/quizzes/quizzes.css';

const Quiz = ({ el, isOpen }) => {
  return isOpen ? (
    <div className='quizzes__item'>
      <h3 className='quizzes__item-name'>{el.title}</h3>
      <p>{el.content}</p>
      <p>Категория: {el.category['name']}</p>
      <p>Кол-во вопросов: {el.number_of_questions}</p>

      <div className="quizzes__questions">
        {el.question_set.map((el) => {
          <p>{el.text}</p>
        })}
      </div>
    </div>
  ) : (
    <div className='quizzes__item'>
      <h3 className='quizzes__item-name'>{el.title}</h3>
      <p>{el.content}</p>
      <p>Категория: {el.category['name']}</p>
      <p>Кол-во вопросов: {el.number_of_questions}</p>
    </div>
  );
};

export default Quiz;
