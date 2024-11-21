import React, { useState } from 'react'

const SearchMedia = ({specificCountries}) => {


    const handleChange = (val) => {
        specificCountries(val)
    }


  return (
    <div>
      <label htmlFor="search-city"></label>
      <input type="text" placeholder='search for country' onChange={(e) => handleChange(e.target.value)} />

      <label htmlFor="filter-search"></label>
      <select name="filter-search" id="filter-search" defaultValue={"Filter by Region"}>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Ocenia">Ocenia</option>
      </select>
    </div>
  )
}

export default SearchMedia
