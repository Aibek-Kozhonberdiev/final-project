import React, { useEffect, useState } from 'react';

const AnimatedNumber = ({ value, duration }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const animationDuration = duration; // Продолжительность анимации в миллисекундах
    const step = Math.max(1, Math.ceil((end - start) / (animationDuration / 60)));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className='main__benefit-title'>{displayValue}</span>;
};

export default AnimatedNumber;
