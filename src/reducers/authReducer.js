const initialState = {
  isAuth: localStorage.getItem('isAuth') || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  userID: localStorage.getItem('userId') || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKENS':
      return {
        isAuth: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };

    default:
      return state;
  }
};

export default authReducer;
