import React, { useState } from 'react'

const SearchMedia = ({setCountry, getCountry, specificRegion, regionList}) => {

    

   

    const handleFilter = (val) => {
        specificRegion(val);
    }

  return (
    <div>
      <label htmlFor="search-city"></label>
      <input type="text" placeholder='search for country' onChange={(e) => setCountry(e.target.value)} value={getCountry} />

      <label htmlFor="filter-countries-search"></label>
<select name="filter-countries-search" id="countries-search" defaultValue="Filter by Region" onChange={(e) => handleFilter(e.target.value)}>
  <option value="Filter by Region" disabled hidden>Filter by Region</option>
  <option value="All">All regions</option>
  {regionList.map((region, ind) => <option key={ind} value={region}>{region}</option>)}
</select>
    </div>
  )
}

export default SearchMedia
