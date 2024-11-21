import React, { useState } from 'react'

const SearchMedia = ({specificCountries}) => {


    const handleChange = (val) => {
        specificCountries(val)
    }


  return (
    <div>
      <label htmlFor="search-city"></label>
      <input type="text" placeholder='search for country' onChange={(e) => handleChange(e.target.value)} />
    </div>
  )
}

export default SearchMedia
