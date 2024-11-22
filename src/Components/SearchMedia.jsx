import React, { useContext } from "react";
import { modeContext } from "../App";
import { FaSearch } from "react-icons/fa";

const SearchMedia = () => {
  const { setCountry, getCountry, specificRegion, regionList, getTheme } =
    useContext(modeContext);
  const handleFilter = (val) => {
    specificRegion(val);
  };

  return (
    <div
      className="flex w-[78%] justify-between my-8 md:flex-wrap sm:flex-wrap md:gap-5 sm:gap-5 "
    >
      <div className="flex w-[500px] justify-center items-center border-none rounded-lg">
      <label id="country-input" className={`${getTheme ? "bg-darkModeElements" : "bg-DarkModeText&LightModeElements"} text-lightModeInput w-[10%] h-[3.2rem] flex justify-center items-center rounded-l-lg`}><FaSearch /></label>
      <input
        type="text"
        placeholder="Search for country..."
        onChange={(e) => setCountry(e.target.value)}
        value={getCountry}
        className={`w-[90%] h-[3.2rem] ${getTheme ? "bg-darkModeElements" : "bg-DarkModeText&LightModeElements"} text-lightModeInput outline-none rounded-r-lg`}
      />
      </div>
      {/* select tags arrow need to customizeds */}

      <select
        name="filter-countries-search"
        id="countries-search"
        defaultValue="Filter by Region"
        onChange={(e) => handleFilter(e.target.value)}
        className={`w-[200px] h-[3.2rem] ${getTheme ? "bg-darkModeElements text-DarkModeText&LightModeElements" : "bg-DarkModeText&LightModeElements"} border-none rounded-lg outline-none ps-3` }
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
  );
};

export default SearchMedia;
