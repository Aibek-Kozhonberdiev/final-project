import React from 'react'

const Button = ({text, className, onClick}) => {
  return (
    <button className={`${className} btn`} onClick={onClick}> 
{text}
    </button>
  )
}

export default Button