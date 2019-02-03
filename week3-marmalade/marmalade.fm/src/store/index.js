const initialState = {
  mixes: [],
  currentMix: 'groovy disco bangers!'
};

function mixesApp(state = initialState, action) {

  switch (action.type) {
    case 'SET_MIX':
      return {
        ...state,
        currentMix: action.payload
      };
    case 'ADD_MIX':
      return {
        ...state,
        mixes: [...state.mixes, action.payload]
      };
    default:
      return state;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  //return state
}

export default mixesApp;
