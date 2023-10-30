export const setTokens = (accessToken, refreshToken) => ({
    type: 'SET_TOKENS',
    isAuth: true,
    accessToken,
    refreshToken,
  });
  
  export const checkToken = () => ({
    type: 'CHECK_TOKEN',
  });
  
  export const refreshTokens = () => ({
    type: 'REFRESH_TOKENS',
  });

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://aiba23334.pythonanywhere.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(response.ok)
      if (response.ok) {
        
        const data = await response.json();
        const { access, refresh } = data;


        localStorage.setItem('isAuth', true);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        dispatch(setTokens(access, refresh));
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
};
