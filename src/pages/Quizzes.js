import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import './quizzes.css'

const Quizzes = () => {
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
      </div>
    </section>
  );
};

export default Quizzes;
