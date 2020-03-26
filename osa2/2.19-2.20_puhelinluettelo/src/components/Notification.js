import React from 'react'

const Notification = ({message}) => {
    if(message === ''){
        return (
            <></>
        )
    } else {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }
}

export default Notification