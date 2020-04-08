export const changeFilter = text => {
  return {
    type: 'FILTER',
    text
  }
}

const reducer = (state = '', action) => {
  switch (action.type){
    case 'FILTER':
      return action.text
    default:
      return state
  }
}

export default reducer