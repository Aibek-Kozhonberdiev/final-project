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
    e.preventDefault(); 

    try {
      const adminAccessToken = localStorage.getItem('adminAccessToken')
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/questions/';

      const headers = {
        Authorization: `Bearer ${adminAccessToken}`,
      };
      const response = await axios.post(apiUrl, data, { headers });
      console.log(response);

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
              value={data.text} 
              onChange={handleInputQuestion}
              placeholder='введите вопрос'
            />
          </div>
          <div className='quizzes__input-form quizzes__input-question'>
            <input
              type='radio'
              name='correct_choice'
              value='1'
              onClick={handleTrueAnswer}
              checked={data.correct_choice === '1'} 
            />
            <input
              type='text'
              name='choice_a'
              value={data.choice_a} 
              onInput={handleInputAnswers}
              placeholder='введите ответ'
              id='1'
            />
          </div>
          <div className='quizzes__input-form quizzes__input-question'>
            <input
              type='radio'
              name='correct_choice'
              value='2'
              onClick={handleTrueAnswer}
              checked={data.correct_choice === '2'} 
            />
            <input
              type='text'
              name='choice_b'
              value={data.choice_b} 
              onInput={handleInputAnswers}
              placeholder='введите ответ'
              id='2'
            />
          </div>
          <button className='btn' type="submit">Создать вопросы</button>
        </form>
      </>
    )
  );
};
export default CreateQuestions