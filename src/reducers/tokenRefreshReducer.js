import axios from 'axios';
import { refreshTokens, login } from '../actions/authActions';

export const refreshTokensThunk = () => async (dispatch, getState) => {
  const { refreshToken } = getState().auth;

  try {
    const response = await axios(
      'http://aiba23334.pythonanywhere.com/api/token/refresh/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    dispatch(login(accessToken, newRefreshToken));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  } catch (error) {
    console.log(error);
  }
};

export default refreshTokensThunk;
