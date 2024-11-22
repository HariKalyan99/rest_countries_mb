import React, { useContext, useEffect } from "react";
import CountryCard from "./CountryCard";
import { modeContext } from "../App";

const CountryDashboard = () => {

    const { pageSwitch, countryList, countryDeatilFn} = useContext(modeContext)

    
  if(!pageSwitch && countryList?.length > 0){return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
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
  );}
};

export default CountryDashboard;
