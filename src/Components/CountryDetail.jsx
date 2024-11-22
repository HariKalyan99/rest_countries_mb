import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modeContext } from "../App";

const CountryDetail = () => {
  const { setPageSwitch, pageSwitch, countryDeatil } = useContext(modeContext);

  const [countryDetailList, setCountryDetailList] = useState([]);




   useEffect(() => {

   
    const fetchLocalCountry = () => {
        const countryData = JSON.parse(localStorage.getItem("countryList")).map(x => x["country"]);
        const borderData = JSON.parse(localStorage.getItem("borderList"));

        // const {region, countryName} = countryData.filter(x => x["countryName"] === countryDeatil)[0];
        // fetchSpecificRegion(region, countryName);
        console.log(countryData.filter(x => x["countryName"] === countryDeatil));
        console.log(borderData);
        
    }

    // const fetchSpecificRegion = async(region, countryName) => {
    //     try {
    //         const data = await fetch(
    //           `https://restcountries.com/v3.1/region/${region}`
    //         );
    //         const jsonData = await data.json();
    //         let sharesBordersWith = jsonData.filter(x => x["name"]["common"] === countryName)[0]?.borders;
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }

    

    if(countryDeatil?.length >= 1){
        fetchLocalCountry()
    }

  }, [countryDeatil]);
  if (pageSwitch) {
    return (
      <Link to={"/"} onClick={() => setPageSwitch(!pageSwitch)}>
        Country detail
      </Link>
    );
  }
};

export default CountryDetail;
