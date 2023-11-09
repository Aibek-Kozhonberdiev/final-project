import React, { useState } from 'react';

import axios, { AxiosHeaders } from 'axios';

const CreateQuestions = ({ isOpen, id }) => {
  const [data, setData] = useState({
    text: '',
    choice_a: '',
    choice_b: '',
    correct_choice: '',
    quiz: id,
  });

  const handleInputQuestion = (e) => {
    data.text = e.target.value;
  };

  const handleInputAnswers = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleTrueAnswer = (e) => {
    data.correct_choice = e.target.value;
  };

  const postQuestions = async (e) => {
    e.preventDefault(); // Предотвращаем стандартное отправление формы

    try {
      const adminAccessToken = localStorage.getItem('adminAccessToken')
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/questions/';

      const headers = {
        Authorization: `Bearer ${adminAccessToken}`,
      };
      const response = await axios.post(apiUrl, data, { headers });
      console.log(response);

      // Очистить значения инпутов после успешной отправки
      setData({
        text: '',
        choice_a: '',
        choice_b: '',
        correct_choice: '',
        quiz: id,
      });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    isOpen && (
      <>
        <p className='section__subtitle'>Create ur questions!</p>
        <form className={'quizzes__modal-form'} onSubmit={postQuestions}>
          <div className='quizzes__input-form'>
            <input
              type='text'
              value={data.text} // Используем значение из состояния data
              onChange={handleInputQuestion}
              placeholder='question'
            />
          </div>
          <div className='quizzes__input-form quizzes__input-question'>
            <input
              type='radio'
              name='correct_choice'
              value='1'
              onClick={handleTrueAnswer}
              checked={data.correct_choice === '1'} // Проверяем соответствие значения
            />
            <input
              type='text'
              name='choice_a'
              value={data.choice_a} // Используем значение из состояния data
              onInput={handleInputAnswers}
              placeholder='answer'
              id='1'
            />
          </div>
          <div className='quizzes__input-form quizzes__input-question'>
            <input
              type='radio'
              name='correct_choice'
              value='2'
              onClick={handleTrueAnswer}
              checked={data.correct_choice === '2'} // Проверяем соответствие значения
            />
            <input
              type='text'
              name='choice_b'
              value={data.choice_b} // Используем значение из состояния data
              onInput={handleInputAnswers}
              placeholder='answer'
              id='2'
            />
          </div>
          <button type="submit">Создать вопросы</button>
        </form>
      </>
    )
  );
};
export default CreateQuestions