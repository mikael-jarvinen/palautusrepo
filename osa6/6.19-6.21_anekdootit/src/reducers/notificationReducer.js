let timeoutId = null

export const changeNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE',
      message
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => dispatch({
      type: 'CHANGE',
      message: 'Good day'
    }), timeout * 1000)
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