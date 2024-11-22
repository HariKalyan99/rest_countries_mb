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
    <SearchMedia
          setCountry={setCountry}
          getCountry={getCountry}
          specificRegion={specificRegion}
          regionList={regionList}
        />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: "100%",
        flexWrap: "wrap",
        gap: "5rem",
        marginTop: "2rem",
      }}
    >
     {countryList?.length > 0 && countryList.map(({country}, ind) => 
        <CountryCard countryDeatilFn={countryDeatilFn} key={ind} country={country}/>
     )}
     
    </div>
    </>
  );}
};

export default CountryDashboard;
