import { jwtDecode } from "jwt-decode";

export const setTokens = (accessToken, refreshToken, userId) => ({
    type: 'SET_TOKENS',
    isAuth: true,
    accessToken,
    refreshToken,
    userId,
  });

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const adminAccessToken = localStorage.getItem('adminAccessToken')
      const response = await fetch('http://aiba23334.pythonanywhere.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminAccessToken}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      
      if (response.ok) {
        
        const data = await response.json();
        const { access, refresh } = data;

        const decoded = jwtDecode(access);
        const userId = decoded.user_id

        if (username == 'root' && password == 'aibek_admin') {
          localStorage.setItem('adminAccessToken', access);
          localStorage.setItem('adminRefreshToken', refresh);
        } else {
          localStorage.setItem('isAuth', true);
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
          localStorage.setItem('userId', userId);
  
          dispatch(setTokens(access, refresh, userId));
        }


      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
};



