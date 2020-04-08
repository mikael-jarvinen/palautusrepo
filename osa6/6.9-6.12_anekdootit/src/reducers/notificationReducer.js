export const changeNotification = message => {
  return {
    type: 'CHANGE',
    message
  }
}

const reducer = (state = 'Good day', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.message
    default:
      return state
  }
}

export default reducer