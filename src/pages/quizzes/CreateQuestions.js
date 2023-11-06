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
    console.log(JSON.stringify(data));
  };

  const postQuestions = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://aiba23334.pythonanywhere.com/api/questions/';

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(apiUrl, data, { headers });
      console.log(response);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    isOpen && (
      <div className='section create-quiz'>
        <div className='container'>
          <p className='section__subtitle'>Create ur questions!</p>

          <form className={'quizzes__modal-form'}>
            <div className='quizzes__input-form'>
              <input
                type='text'
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
              />
              <input
                type='text'
                name='choice_a'
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
              />
              <input
                type='text'
                name='choice_b'
                onInput={handleInputAnswers}
                placeholder='answer'
                id='2'
              />
            </div>
          </form>
          <button onClick={postQuestions}>Создать вопросы</button>
        </div>
      </div>
    )
  );
};

export default CreateQuestions;
