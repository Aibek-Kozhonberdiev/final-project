// reducers/quizzesReducer.js
const initialState = {
    quizzes: [],
  };
  
  const quizzesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_QUIZZES':
        return {
          ...state,
          quizzes: action.quizzes,
        };
      default:
        return state;
    }
  };
  
  export default quizzesReducer;