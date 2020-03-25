import React from 'react'

const Search = ({onSearch}) => {
    return (
        <form>
            filter shown with <input onChange={onSearch}/>
        </form>
    )
}

export default Search