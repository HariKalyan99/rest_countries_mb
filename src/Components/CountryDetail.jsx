import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modeContext } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";

const CountryDetail = () => {
  const { setPageSwitch, pageSwitch, countryDeatil, setCountryDetail } =
    useContext(modeContext);

  const [countryDetailList, setCountryDetailList] = useState({});

  useEffect(() => {
    const fetchLocalCountry = async () => {
      const countryData = JSON.parse(localStorage.getItem("countryList")).map(
        (x) => x["country"]
      );

      const { region, countryName } = countryData.filter(
        (x) => x["countryName"] === countryDeatil
      )[0];
      let borderObj = {};

      if(region?.length > 0 && countryName?.length > 0){
        let ans = await fetchSpecificBorder(region, countryName);
        if(ans?.length > 0){

          borderObj[countryName] = borderObj[countryName] || [];
          borderObj[countryName] = [...ans];
          let newCountryObj = {...countryData.filter((x) => x["countryName"] === countryDeatil)[0], borders: borderObj[`${countryName}`]}
          setCountryDetailList(newCountryObj);
          }
      }
      
    };

    if (countryDeatil?.length >= 1) {
      fetchLocalCountry();
    }
    
  }, [countryDeatil]);

  const fetchSpecificBorder = async (region, countryName) => {
    try {
      const data = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const jsonData = await data.json();
      return (
        jsonData.filter((x) => x["name"]["common"] === countryName)[0]
          ?.borders || ["no borders"]
      );
    } catch (error) {
      console.log(error);
    }
  };

  function populationConvert(val){
    return val
  }

  const borderCountry = (border) => {
    let countryList = JSON.parse(localStorage.getItem("countryList"))?.filter(x => x["country"]["border1"] === border)[0];
    
    if(countryList){
      return countryList["country"]["countryName"];
    }else {
      return "no borders"
    }
  } 

  
  if (pageSwitch) {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "4rem"
        }}
      >
            <div style={{width: "80%"}}>
            <div style={{ width: "8rem", height: "2.7rem" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/"}
            onClick={() => setPageSwitch(!pageSwitch)}
          >
            <div
              style={{
                height: "100%",
                border: "none",
                backgroundColor: "white",
                borderRadius: "0.2rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6%",
                boxShadow: "2px 2px 5px grey",
              }}
            >
              <FaArrowLeftLong style={{ paddingBottom: "1%" }} />
              <span style={{ textAlign: "center" }}> Back</span>
            </div>
          </Link>
        </div>
            </div>

        {countryDetailList["countryName"]?.length > 0 && <div style={{ width: "80%", height: "55%", display: "flex", justifyContent: "center", alignItems: "center", gap: "5%" }}>
            <div style={{ width: "50%", height: "90%"}}>
              <img src={countryDetailList.flag} alt="photo" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>

            <div style={{ width: "50%", height: "90%",  display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column" }}>
              <div style={{width: "100%", height: "15%"}}>
                <span style={{fontSize: "1.8rem", fontWeight: "bold"}}>{countryDetailList.countryName}</span>
              </div>
              <div style={{width: "100%", height: "50%",  display: "flex", justifyContent: "space-between"}}>
                <div style={{width: '40%', height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "0.8rem"}}>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Native Name:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.nativeName}</span></span>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Population:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.population}</span></span>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Region:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.region}</span></span>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Sub Region:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.subregion || "N/A"}</span></span>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Capital:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.capital}</span></span>

                </div>
                <div style={{width: '40%', height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start",alignItems: "flex-start", gap: "0.8rem"}}>
               
               
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Top Level Domain:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.tld}</span></span>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Currencies:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.currencies || "N/A"}</span></span>
                <span style={{fontSize: "0.9rem", fontWeight: "bold"}}>Languages:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.capital}</span></span>
                </div>
              </div>
              <div style={{display: "flex" ,width: "100%", height: "10%",  display: "flex", justifyContent:"flex-start", gap: "0.8rem", alignItems: "center"}}>
                <span style={{fontSize: "1rem", fontWeight: "bold"}}>Border Countries: </span>
                {countryDetailList[`borders`]?.map((border, ind) => 
                <div key={ind} style={{width: "15%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "1px 1px 5px black", borderRadius: "0.2rem"}}>
                  <span style={{fontSize: '0.7rem'}}>{borderCountry(border)}</span>
                  </div>)}
              </div>
            </div>
        </div>}
        {/* <button onClick={() => setCountryDetail("India")}>get India</button> */}
      </div>
    );
  }
};

export default CountryDetail;
