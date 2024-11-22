import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modeContext } from "../App";

const CountryDetail = () => {
  const { setPageSwitch, pageSwitch, countryDeatil, setCountryDetail } =
    useContext(modeContext);

  const [countryDetailList, setCountryDetailList] = useState([]);

  useEffect(() => {
    const fetchLocalCountry = async () => {
      const countryData = JSON.parse(localStorage.getItem("countryList")).map(
        (x) => x["country"]
      );

      const { region, countryName } = countryData.filter(
        (x) => x["countryName"] === countryDeatil
      )[0];
      let borderObj = {};

      let ans = await fetchSpecificBorder(region, countryName);
      borderObj[countryName] = borderObj[countryName] || [];
      borderObj[countryName] = [...ans];
      console.log(borderObj);
      console.log(
        countryData.filter((x) => x["countryName"] === countryDeatil)[0]
      );
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
  if (pageSwitch) {
    return (
      <div>
        <Link to={"/"} onClick={() => setPageSwitch(!pageSwitch)}>
          Country detail
        </Link>

        <button onClick={() => setCountryDetail("India")}>get India</button>
      </div>
    );
  }
};

export default CountryDetail;
