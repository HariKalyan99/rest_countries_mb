import React, { useContext } from "react";
import CountryCard from "./CountryCard";
import { modeContext } from "../App";
import SearchMedia from "./SearchMedia";

const CountryDashboard = () => {
  const {
    countryList,
    countryDeatilFn,
    getCountry,

    regionList,
  } = useContext(modeContext);

  if (countryList?.length > 0) {
    return (
      <>
        <SearchMedia />
        <div className="flex flex-wrap gap-20 justify-center w-[80%] py-6">
          {countryList?.length > 0 &&
            countryList.map(({ country }, ind) => (
              <CountryCard
                countryDeatilFn={countryDeatilFn}
                key={ind}
                country={country}
              />
            ))}
        </div>
      </>
    );
  }
};

export default CountryDashboard;
