import React from 'react';

const Input = ({className, onClick,placeholder, type}) => {
  return (
    <div className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'>
        <g clip-path='url(#clip0_0_108)'>
          <path
            d='M19.7266 17.293L15.832 13.3984C15.6562 13.2227 15.418 13.125 15.168 13.125H14.5312C15.6094 11.7461 16.25 10.0117 16.25 8.125C16.25 3.63672 12.6133 0 8.125 0C3.63672 0 0 3.63672 0 8.125C0 12.6133 3.63672 16.25 8.125 16.25C10.0117 16.25 11.7461 15.6094 13.125 14.5312V15.168C13.125 15.418 13.2227 15.6562 13.3984 15.832L17.293 19.7266C17.6602 20.0938 18.2539 20.0938 18.6172 19.7266L19.7227 18.6211C20.0898 18.2539 20.0898 17.6602 19.7266 17.293ZM8.125 13.125C5.36328 13.125 3.125 10.8906 3.125 8.125C3.125 5.36328 5.35938 3.125 8.125 3.125C10.8867 3.125 13.125 5.35938 13.125 8.125C13.125 10.8867 10.8906 13.125 8.125 13.125Z'
            fill='white'
            fill-opacity='0.5'
          />
        </g>
        <defs>
          <clipPath id='clip0_0_108'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <input
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;