import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modeContext } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";

const CountryDetail = () => {
  const {  countryDeatil, setCountryDetail } =
    useContext(modeContext);

  const [countryDetailList, setCountryDetailList] = useState({});

  useEffect(() => {
    const fetchLocalCountry = async () => {
      const countryData = JSON.parse(localStorage.getItem("countryList")).map(
        (x) => x["country"]
      );
      let newCountryObj = {...countryData.filter((x) => x["countryName"] === countryDeatil)[0]}
      setCountryDetailList(newCountryObj);
    };

    if (countryDeatil?.length >= 1) {
      fetchLocalCountry();
    }
    
  }, [countryDeatil]);


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
                <span className="text-base font-bold">Native Name:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.nativeName}</span></span>
                <span className="text-base font-bold">Population:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.population}</span></span>
                <span className="text-base font-bold">Region:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.region}</span></span>
                <span className="text-base font-bold">Sub Region:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.subregion || "N/A"}</span></span>
                <span className="text-base font-bold">Capital:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.capital}</span></span>

                </div>
                <div style={{width: '40%', height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start",alignItems: "flex-start", gap: "0.8rem"}}>
               
               
                <span className="text-base font-bold">Top Level Domain:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.tld}</span></span>
                <span className="text-base font-bold">Currencies:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.currencies || "N/A"}</span></span>
                <span className="text-base font-bold">Languages:  <span style={{fontSize: "0.9rem", fontWeight: "lighter"}}>{countryDetailList.capital}</span></span>
                </div>
              </div>
              <div style={{display: "flex" ,width: "100%", height: "10%",  display: "flex", justifyContent:"flex-start", gap: "0.8rem", alignItems: "center"}}>
                <span style={{fontSize: "1rem", fontWeight: "bold"}}>Border Countries: </span>
                {countryDetailList[`borders`]?.map((border, ind) => 
                <div key={ind} style={{width: "15%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "1px 1px 5px black", borderRadius: "0.2rem", cursor: "pointer"}} onClick={() => setCountryDetail(borderCountry(border))}>
                  <span style={{fontSize: '0.7rem'}}>{borderCountry(border)}</span>
                  </div>)}
              </div>
            </div>
        </div>}
        {/* <button onClick={() => setCountryDetail("India")}>get India</button> */}
      </div>
    );
};

export default CountryDetail;
