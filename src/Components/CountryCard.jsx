import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { modeContext } from "../App";

const CountryCard = ({ country, countryDeatilFn }) => {
  const { getTheme } = useContext(modeContext);
  const { countryName, capital, flag, population, region } = country;

  const handleClick = (name) => {
    countryDeatilFn(name, region);
  };

  return (
    <Link
      to={"/country-detail"}
      className={`h-[350px] w-[300px] flex justify-around items-center flex-col shadow rounded-lg ${
        getTheme ? "bg-darkModeElements" : "bg-DarkModeText&LightModeElements"
      }`}
      onClick={() => handleClick(countryName)}
    >
      <div className="w-[100%] h-[49%] rounded-t-lg overflow-hidden">
        <img
          src={flag}
          alt={"photo"}
          className="w-[100%] h-[100%] object-cover rounded-t-lg"
        />
      </div>
      {getTheme ? <div className="w-[80%] h-[51%] flex justify-evenly items-start flex-col text-DarkModeText&LightModeElements pb-3">
        <span className="text-lg font-bold">{countryName}</span>
        <div className="w-[80%] flex justify-center gap-1 items-start flex-col">
          <span className="text-sm text-DarkModeText&LightModeElements">Population: {population}</span>
          <span className="text-sm text-DarkModeText&LightModeElements">Region: {region}</span>
          <span className="text-sm text-DarkModeText&LightModeElements">Capital: {capital}</span>
        </div>
      </div> : <div className="w-[80%] h-[51%] flex justify-evenly items-start flex-col text-DarkModeText&LightModeElements pb-3">
        <span className="text-lg font-bold text-lightModeText">{countryName}</span>
        <div className="w-[80%] flex justify-center gap-1 items-start flex-col">
          <span className="text-sm text-lightModeText">Population: {population}</span>
          <span className="text-sm text-lightModeText">Region: {region}</span>
          <span className="text-sm text-lightModeText">Capital: {capital}</span>
        </div>
      </div>}
    </Link>
  );
};

export default CountryCard;
