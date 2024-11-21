import React, { useEffect } from "react";
import CountryCard from "./CountryCard";

const CountryDashboard = ({countryList}) => {
    
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: "100%",
        flexWrap: "wrap",
        gap: "3rem",
        marginTop: "2rem",
      }}
    >
     {countryList?.map(({country}, ind) => 
        <CountryCard key={ind} country={country}/>
     )}
     
    </div>
  );
};

export default CountryDashboard;
