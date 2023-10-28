import React from 'react';
import { useState, useEffect } from 'react';

const Timer = ({setTimeUp}) => {
  const [time, setTime] = useState(60);
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        setTimeUp(true);
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div>
      <p>Оставшееся время: {time} сек.</p>
    </div>
  );
};

export default Timer;
