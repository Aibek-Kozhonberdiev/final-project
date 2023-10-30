// import axios from 'axios';
// import { refreshToken, login } from '../actions/authActions';

// export const refreshTokensThunk = () => async (dispatch, getState) => {
//   const { refreshToken } = getState().auth;

//   try {
//     const response = await axios.post('http://aiba23334.pythonanywhere.com/api/token/refresh/', { refreshToken });

//     const { accessToken, refreshToken: newRefreshToken } = response.data;

//     dispatch(login(accessToken, newRefreshToken));
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', newRefreshToken);
//   } catch (error) {

//   }
// };

// export default refreshTokensThunk;
