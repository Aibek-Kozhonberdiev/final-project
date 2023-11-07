import React, { useState, useEffect } from 'react';
import './game.css';
import Timer from '../../components/Timer.js';
import Button from '../../components/Button';
import Notification from '../../components/Notification';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../actions/authActions.js';
import { useSelector, useDispatch } from 'react-redux';


const Game = () => {
  const [isTimeUp, setTimeUp] = useState(false);
  const quizzes = JSON.parse(localStorage.getItem('quizzes'));
  const lobby = JSON.parse(localStorage.getItem('lobby'));
  const userId = JSON.parse(localStorage.getItem('userId'));

  const quiz = quizzes.find((quiz) => quiz.id === lobby.quizzes);

  const questionSets = quiz.question_set;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] =useState(0)

  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const handleAnswerCheckbox = (e) => {
    setSelectedAnswer(parseInt(e.target.value));
    if (selectedAnswer === questionSets[currentQuestionIndex]?.correct_choice) {
      setIsCorrect(10)
      
    } else {
      setIsCorrect(-3)
    }
    console.log(isCorrect)
  };
  const dispatch = useDispatch();
  dispatch(login('root', 'aibek_admin'));
  const nextQuestion =async() => {
    if (currentQuestionIndex < questionSets.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeUp(!isTimeUp);

      try {
        const adminAccessToken = localStorage.getItem('AdminAccessToken')
        const apiUrl = `http://aiba23334.pythonanywhere.com/api/add-delete-point/${userId}/`;
  
        const headers = {
          Authorization: `Bearer ${adminAccessToken}`,
        };
        const data = {
          point: isCorrect
        }
        const response = await axios.post(apiUrl, data, { headers });

  
      } catch (error) {
        console.error('Ошибка:', error);
        if (error.response.data.detail === 'The user is already in another room.') {
          alert("Вы уже состоите в комнате")
        }
      }

    }
  };
  return isTimeUp ? (
    <div className='notification section'>
      <div className='container'>
        <h2 className='section__title'>Result</h2>
        <p className='section__subtitle'>кто был прав?</p>

        <div className='notification__wrapper'>
          {lobby.members.map((member)=> (
          <p className='notification__gamer'>Участник {member}: {selectedAnswer === questionSets[currentQuestionIndex]?.correct_choice ? 'true' : 'false'}</p>
          ))}


          {currentQuestionIndex === questionSets.length - 1 && (
            <NavLink to='/notification' className='header__link'>
              <Button
                text='показать результаты'
                className={'notification__btn'}
                onClick={nextQuestion}
              />
            </NavLink>
          )}
          {currentQuestionIndex !== questionSets.length - 1 && (
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
        <div className='game__wrapper'>
          <p className='game__question'>
            {questionSets[currentQuestionIndex]?.text}
          </p>
          <div className='game__answers'>
            <div className='game__answer'>
              <input
                id='choice_a'
                value='1'
                type='checkbox'
                className='answer__checkbox'
                onClick={handleAnswerCheckbox}
              />
              <label htmlFor='choice_a' className='game__answer-var'>
                {questionSets[currentQuestionIndex]?.choice_a}
              </label>
            </div>
            <div className='game__answer'>
              <input
                type='checkbox'
                className='answer__checkbox'
                id='choice_b'
                value='2'
                onClick={handleAnswerCheckbox}
              />
              <label htmlFor='' className='game__answer-var'>
                {questionSets[currentQuestionIndex]?.choice_b}
              </label>
            </div>
            {questionSets[currentQuestionIndex]?.choice_c !== null && (
              <div className='game__answer'>
                <input type='checkbox' className='answer__checkbox' />
                <label htmlFor='' className='game__answer-var'>
                  {questionSets[currentQuestionIndex].choice_c}
                </label>
              </div>
            )}
            {questionSets[currentQuestionIndex]?.choice_d !== null && (
              <div className='game__answer'>
                <input type='checkbox' className='answer__checkbox' />
                <label htmlFor='' className='game__answer-var'>
                  {questionSets[currentQuestionIndex].choice_d}
                </label>
              </div>
            )}
          </div>
          <Timer setTimeUp={setTimeUp} />
        </div>
      </div>
    </section>
  );
};

export default Game;
