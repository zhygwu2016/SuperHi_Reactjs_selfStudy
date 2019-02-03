
const setMix = payload => ({
  type: 'SET_MIX', payload
});

const addMix = payload => ({
  type: 'ADD_MIX', payload 
});

// const addMix = payload => {
//   return{
//     type: 'ADD_MIX',
//     payload
//   };
// };

// export all of our action creators
export default {
  setMix,
  addMix
};
