import axios from 'axios';
import { refreshTokens, login } from '../actions/authActions';
import { useDispatch } from 'react-redux';

export const startRefreshToken = async (dispatch) => {

  console.log('refresh is started');

  const refreshToken = localStorage.getItem('refreshToken');
  console.log(refreshToken);
  try {
    const response = await axios.post(
      'http://aiba23334.pythonanywhere.com/api/token/refresh/',
      {
        refresh: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const newAccessToken = response.data.access
    
    dispatch(login(newAccessToken));
    localStorage.setItem('accessToken', newAccessToken);
  } catch (error) {
    console.log(error);
  }
};



