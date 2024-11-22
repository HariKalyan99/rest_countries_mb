import React, { useContext, useState } from "react";
import { modeContext } from "../App";

const SearchMedia = ({
  setCountry,
  getCountry,
  specificRegion,
  regionList,
}) => {

    const {pageSwitch} = useContext(modeContext)
  const handleFilter = (val) => {
    specificRegion(val);
  };

  if(!pageSwitch){return (
    <div style={{display: "flex", width: "95%", justifyContent: "space-between", border: "1px solid"}}>
      <input
        type="text"
        placeholder="search for country"
        onChange={(e) => setCountry(e.target.value)}
        value={getCountry}
        style={{height: "3.2rem", width: "30%"}}
      />

      <select
        name="filter-countries-search"
        id="countries-search"
        defaultValue="Filter by Region"
        onChange={(e) => handleFilter(e.target.value)} style={{height: "3.2rem", width: "20%"}}
      >
        <option value="Filter by Region" disabled hidden>
          Filter by Region
        </option>
        <option value="All">All regions</option>
        {regionList.map((region, ind) => (
          <option key={ind} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );}
};

export default SearchMedia;
