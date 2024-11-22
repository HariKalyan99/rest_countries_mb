import React, { useContext, useEffect } from "react";
import CountryCard from "./CountryCard";
import { modeContext } from "../App";
import SearchMedia from "./SearchMedia";

const CountryDashboard = () => {

    const { countryList, countryDeatilFn,setCountry,
      getCountry,
      specificRegion,
      regionList} = useContext(modeContext)

    
  if(countryList?.length > 0){return (
    <>
    <SearchMedia />
    <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   width: "80%",
      //   height: "100%",
      //   flexWrap: "wrap",
      //   gap: "5rem",
      //   marginTop: "2rem",
      // }}
      className="container flex flex-wrap gap-20 justify-center w-full py-6"
    >
     {countryList?.length > 0 && countryList.map(({country}, ind) => 
        <CountryCard countryDeatilFn={countryDeatilFn} key={ind} country={country}/>
     )}
     
    </div>
    </>
  );}
};

export default CountryDashboard;
