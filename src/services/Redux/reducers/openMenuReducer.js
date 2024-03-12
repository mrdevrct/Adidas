const openMenuReducer = (state = false, action) => {
    switch (action.type) {
      case 'SET_OPEN_MENU':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default openMenuReducer;
  