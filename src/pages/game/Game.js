import React, { useState } from 'react';
import './game.css';
import Timer from '../../components/Timer.js';
import Button from '../../components/Button';
import Notification from '../../components/Notification';

const Game = () => {
  const [isTimeUp, setTimeUp] = useState(false);

  return isTimeUp ? (
    <Notification />
  ) : (
    <section className='game section'>
      <div className='container'>
        <h2 className='section__title'>Игра началась</h2>
        <p className='section__subtitle'>Выберите правильный ответ</p>

        <div className='game__wrapper'>
          <p className='game__question'>Question</p>
          <div className='game__answers'>
            <div className='game__answer'>
              <input
                id='answer1'
                type='checkbox'
                className='answer__checkbox'
              />
              <label htmlFor='answer1' className='game__answer-var'>
                Answer 1
              </label>
            </div>

            <div className='game__answer'>
              <input type='checkbox' className='answer__checkbox' />
              <label htmlFor='' className='game__answer-var'>
                Answer 1
              </label>
            </div>

            <div className='game__answer'>
              <input type='checkbox' className='answer__checkbox' />
              <label htmlFor='' className='game__answer-var'>
                Answer 1
              </label>
            </div>

            <div className='game__answer'>
              <input type='checkbox' className='answer__checkbox' />
              <label htmlFor='' className='game__answer-var'>
                Answer 1
              </label>
            </div>
          </div>
          <Timer setTimeUp={setTimeUp} />
        </div>
      </div>
    </section>
  );
};

export default Game;
