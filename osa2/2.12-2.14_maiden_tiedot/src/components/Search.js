import React from 'react'

const Search = ({handleChange, search}) => {
    return (
        <form>
            find countries <input value={search} onChange={handleChange} />
        </form>
    )
}

export default Search