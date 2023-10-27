import React from 'react'
import Button from '../../components/Button'

const Signin = () => {
  return (
    <section className='login'>
    <div className='login__container container'>
      <h2 className='section__title'>Регистрация</h2>
      <p className='section__subtitle'>Придумайте логин и пароль</p>

      <div className='login__wrapper'>
        <form action='' className='login__form'>
          <div className='login__input'>
              <label htmlFor="">Логин: </label>
            <input type='text' placeholder='логин'/>
          </div>

          <div className='login__input'>
          <label htmlFor="">Введите пароль: </label>
            <input type='password' placeholder='ваш пароль' />
          </div>

          <Button className={'login__btn'} text={'Зарегистрироваться'} />
        </form>
      </div>
    </div>
  </section>
  )
}

export default Signin