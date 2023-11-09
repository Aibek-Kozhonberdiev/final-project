import React, { useState, useEffect } from 'react';
import './game.css';
import Timer from '../../components/Timer.js';
import Button from '../../components/Button';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../actions/authActions.js';
import { useSelector, useDispatch } from 'react-redux';

const Game = () => {
  const [isTimeUp, setTimeUp] = useState(false);
  const quizzes = JSON.parse(localStorage.getItem('quizzes'));
  const lobby = JSON.parse(localStorage.getItem('lobby'));
  const userId = JSON.parse(localStorage.getItem('userId'));

  const quiz = quizzes?.find((quiz) => quiz?.id === lobby?.quizzes);
  const questionSets = quiz?.question_set || [];
  const initialQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [isCorrect, setIsCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);

  const dispatch = useDispatch();
  dispatch(login('root', 'aibek_admin'));

  const handleAnswerCheckbox = (e) => {
    const chosenAnswer = parseInt(e.target.value);
    setSelectedAnswer(chosenAnswer);
    setIsCorrect(chosenAnswer === questionSets[currentQuestionIndex]?.correct_choice ? 10 : -3);
  };
  

  const nextQuestion = async () => {

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      
      setTimeUp(!isTimeUp);
  
      try {
        const adminAccessToken = localStorage.getItem('adminAccessToken');
        const apiUrl = `http://aiba23334.pythonanywhere.com/api/add-delete-point/${userId}/`;
  
        const headers = {
          Authorization: `Bearer ${adminAccessToken}`,
        };
        const data = {
          point: isCorrect, 
        };
        const response = await axios.post(apiUrl, data, { headers });
        console.log('add-point start');
      } catch (error) {
        console.error('Ошибка:', error);
      }

  };
  localStorage.setItem('currentQuestionIndex', currentQuestionIndex);

  

  return isTimeUp ? (
    <div className='notification section'>
      <div className='container'>
        <h2 className='section__title'>Результаты</h2>
        <p className='section__subtitle'>Кто был прав?</p>

        <div className='notification__wrapper'>
          {lobby.members.map((member, index) => (
            <p key={index} className='notification__gamer'>
              Участник {member}: {isCorrect} б.
            </p>
          ))}

          {currentQuestionIndex === questionSets.length - 1 ? (
            <NavLink to='/notification' className='header__link'>
              <Button
                text='Завершить игру'
                className={'notification__btn'}
                onClick={nextQuestion}
              />
            </NavLink>
          ) : (
            <NavLink to='/game' className='header__link'>
              <Button
                text='next question'
                className={'notification__btn'}
                onClick={nextQuestion}
              />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  ) : (
    <section className='game section'>
      <div className='container'>
        <h2 className='section__title'>Игра началась</h2>
        <p className='section__subtitle'>Выберите правильный ответ</p>
        {questionSets.length ? (
          <div className='game__wrapper'>
            <p className='game__question'>{questionSets[currentQuestionIndex]?.text}</p>
            <div className='game__answers'>
              {['choice_a', 'choice_b', 'choice_c', 'choice_d'].map((choice, index) => {
                const choiceValue = questionSets[currentQuestionIndex][choice];
                if (choiceValue) {
                  return (
                    <div className='game__answer' key={index}>
                      <input
                        id={choice}
                        value={index + 1}
                        type='checkbox'
                        className='answer__checkbox'
                        onClick={handleAnswerCheckbox}
                      />
                      <label htmlFor={choice} className='game__answer-var'>
                        {choiceValue}
                      </label>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <Timer setTimeUp={setTimeUp} />
          </div>
        ) : (
          <div>no question</div>
        )}
      </div>
    </section>
  );
};

export default Game;
