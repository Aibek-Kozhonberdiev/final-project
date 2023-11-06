const initialState = {
    roomId: 0,
  };
  
  const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ROOMID':
        return {
          ...state,
          roomId: action.roomId,
        };
      default:
        return state;
    }
  };
  
  export default roomReducer;