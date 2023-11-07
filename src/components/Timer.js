import React, { useState, useEffect } from 'react';

const Timer = ({ setTimeUp }) => {
  const initialTime = 10; 
  const [time, setTime] = useState(initialTime);

  useEffect(() => {

    const storedStartTime = localStorage.getItem('timerStartTime');
    if (storedStartTime) {

      const currentTime = Date.now();
      const startTime = parseInt(storedStartTime, 10);
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);

      if (elapsedTime < initialTime) {

        const remainingTime = initialTime - elapsedTime;
        setTime(remainingTime);
      }
    }


    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        setTimeUp(true);
      }
    }, 1000); 

    return () => {
      clearInterval(timer);
    };
  }, [time, setTimeUp]);

  return (
    <div>
      <p>Оставшееся время: {time} сек.</p>
    </div>
  );
};

export default Timer;
