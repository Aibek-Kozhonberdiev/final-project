import React, { useState } from 'react';
import '../pages/quizzes/quizzes.css';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import CreateQuestions from '../pages/quizzes/CreateQuestions';

const Quiz = ({ el }) => {

  const [qModalIsOpen, setQModalIsOpen] = useState('')
const handleAddQustions = () => {
  setQModalIsOpen(!qModalIsOpen)
}


  return (
    <div className='quizzes__item'>
      <h3 className='quizzes__item-name'>{el.title}</h3>
      <p>{el.content}</p>
      <p>Категория: {el?.category?.name}</p>
      <p>Кол-во вопросов: {el.question}</p>

      <div className='quizzes__questions'>
        {el.question_set.map((question, idx) => (
          <div className='quizzes__questions'>
          <p key={idx}>{`${idx+1}: ${question.text}`}</p>
          </div>
        ))}

      </div>
      <button onClick={()=>{handleAddQustions()}}>Add questions</button>
      <CreateQuestions isOpen= {qModalIsOpen} id={el.id}/>

    </div>
  )
};

export default Quiz;
