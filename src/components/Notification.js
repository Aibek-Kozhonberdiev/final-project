import React from 'react'
import Button from './Button'
const Notification = () => {
  return (
    <div className="notification section">
        <div className="container">
            <h2 className="section__title">Result</h2>
            <p className="section__subtitle">кто был прав?</p>
            
            <div className="notification__wrapper">
                <p className="notification__gamer">Участник 1: + 10 баллов</p>
                <p className="notification__gamer">Участник 1: + 10 баллов</p>
                <p className="notification__gamer">Участник 1: + 10 баллов</p>
                <p className="notification__gamer">Участник 1: + 10 баллов</p>
                <Button text="next question" className={'notification__btn'}/>
            </div>

            
        </div>
    </div>
  )
}

export default Notification