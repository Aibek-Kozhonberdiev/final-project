import React, { useState} from 'react'
import axios from 'axios';
import Modal from 'react-modal';

import { useDispatch } from 'react-redux';
import { AddRoomId } from '../../actions/quizzesActions';
import { useSelector } from 'react-redux';

const Complaint = ({isOpen, setIsOpen}) => {
    const [complaint,setComplaint ] = useState('');

  const handleComplaint = (e) => {
    setComplaint(e.target.value);
  };
console.log(complaint)
    const sendComplaint = async (e) => {
        e.preventDefault();
    
        try {
          const adminAccessToken = localStorage.getItem('adminAccessToken')
          const userId = localStorage.getItem('userId')
          const apiUrl = `http://aiba23334.pythonanywhere.com/api/send_complaint/${userId}/`;
    
          const headers = {
            Authorization: `Bearer ${adminAccessToken}`,
          };
          const data = {
            "text": `${complaint}`
            };
          const response = await axios.post(apiUrl, data, { headers });
          setIsOpen(!isOpen)

    
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };
      
  return (
    isOpen && (
        <Modal isOpen={isOpen} className={'footer__complaint'}>
          <div className='container'>
            <h2 className='section__title complaint__title-modal'>
              Опишите жалобу
            </h2>
            <form className={'complaint__modal-form'}>
              <div className='complaint__input-form'>
                <input
                  type='text'
                  name='title'
                  onChange={handleComplaint}
                  placeholder='Title'
                />
              </div>

            </form>
            <button onClick={sendComplaint}>Создать</button>
          </div>
        </Modal>
      )
  )
}

export default Complaint