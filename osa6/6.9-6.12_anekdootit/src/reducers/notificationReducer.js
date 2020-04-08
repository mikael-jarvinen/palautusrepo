export const changeNotification = message => {
  return {
    type: 'CHANGE',
    message
  }
}

export const clearNotification = () => {
  return {
    type: 'CHANGE',
    message: 'Good day'
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