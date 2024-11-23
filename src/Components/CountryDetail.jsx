import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modeContext } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";

const CountryDetail = () => {
  const { countryDeatil, setCountryDetail, populationConvert, getTheme } =
    useContext(modeContext);

  const [countryDetailList, setCountryDetailList] = useState({});

  useEffect(() => {
    const fetchLocalCountry = async () => {
      const countryData = JSON.parse(localStorage.getItem("countryList")).map(
        (x) => x["country"]
      );
      let newCountryObj = {
        ...countryData.filter((x) => x["countryName"] === countryDeatil)[0],
      };
      localStorage.setItem("countryObj", JSON.stringify(newCountryObj));
      setCountryDetailList(newCountryObj);
    };

    if (countryDeatil?.length >= 1) {
      fetchLocalCountry();
    }
  }, [countryDeatil]);


  const borderCountry = (border) => {
    let countryList = JSON.parse(localStorage.getItem("countryList"))?.filter(
      (x) => x["country"]["border1"] === border
    )[0];

    if (countryList) {
      return countryList["country"]["countryName"];
    } else {
      return "no borders";
    }
  };

  return (
    <div className="w-[100%] h-full flex justify-start mt-20 items-center flex-col gap-10">
      {getTheme ? <div className="w-[80%] flex justify-start ">
        <Link className="text-none" to={"/"}>
          <div
            className={`h-[100%] border-none text-DarkModeText&LightModeElements rounded w-[145px] h-[45px] flex justify-center items-center gap-3 shadow bg-darkModeElements`}
          >
            <FaArrowLeftLong />
            <span> Back</span>
          </div>
        </Link>
      </div>: <div className="w-[80%] flex justify-start">
        <Link className="text-none" to={"/"}>
          <div
            className={`h-[100%] border-none text-lightModeText rounded  w-[145px] h-[45px]  flex justify-center items-center gap-3 shadow `}
          >
            <FaArrowLeftLong />
            <span> Back</span>
          </div>
        </Link>
      </div>}

      {getTheme ? <>{countryDetailList["countryName"]?.length > 0 && (
        <div className=" w-[90%] md:w-[80%] h-full flex justify-center  lg:justify-between items-center flex-wrap gap-10">
          <div className="w-full h-[300px] md:h-[400px] md:w-[500px] lg:w-[45%]">
            <img
              src={countryDetailList.flag}
              alt={`${countryDetailList.flag}_photo`}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          
          <div className="w-full min-h-[300px] md:h-[400px] md:w-[500px] lg:w-[45%] flex justify-around items-center flex-col py-5 md:py-0">
            <div className="w-[100%] h-[15%]">
              <span className="text-xl font-bold text-DarkModeText&LightModeElements">
                {countryDetailList.countryName}
              </span>
            </div>
            <div className="w-[100%] h-[50%] flex justify-between">
              <div className="w-[40%] h-[100%] flex flex-col justify-start gap-4">
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Native Name:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.nativeName}
                  </span>
                </span>
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Population:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {populationConvert(countryDetailList.population)}
                  </span>
                </span>
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Region:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.region}
                  </span>
                </span>
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Sub Region:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.subregion || "N/A"}
                  </span>
                </span>
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Capital:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.capital}
                  </span>
                </span>
              </div>
              <div className="w-[40%] h-[100%] flex flex-col justify-start items-start gap-4">
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Top Level Domain:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.tld}
                  </span>
                </span>
                <span className="text-base font-bold text-DarkModeText&LightModeElements">
                  Currencies:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.currencies || "N/A"}
                  </span>
                </span>
                <span className="text-base font-bol text-DarkModeText&LightModeElements">
                  Languages:{" "}
                  <span className="text-base font-light text-DarkModeText&LightModeElements">
                    {countryDetailList.capital}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex w-[100%] h-[15%] justify-start gap-2 items-center flex-wrap">
              <span className="text-lg font-bold text-DarkModeText&LightModeElements">
                Border Countries:{" "}
              </span>
              {countryDetailList[`borders`]?.map((border, ind) => (
                <div
                  key={ind}
                  className="w-[16%] h-[50%] flex justify-center items-center shadow rounded cursor-pointer bg-darkModeElements"
                  onClick={() => setCountryDetail(borderCountry(border))}
                >
                  <span className="text-xs text-DarkModeText&LightModeElements">
                    {borderCountry(border)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}</> : <>{countryDetailList["countryName"]?.length > 0 && (
        <div className="w-[90%] md:w-[80%] h-full flex justify-center  lg:justify-between items-center flex-wrap gap-10">
          <div className="w-full h-[300px] md:h-[400px] md:w-[500px] lg:w-[45%]">
            <img
              src={countryDetailList.flag}
              alt={`${countryDetailList.flag}_photo`}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>

          <div className="w-full min-h-[300px] md:h-[400px] md:w-[500px] lg:w-[45%] flex justify-around items-center flex-col py-5 md:py-0">
            <div className="w-[100%] h-[15%]">
              <span className="text-xl font-bold text-lightModeText">
                {countryDetailList.countryName}
              </span>
            </div>
            <div className="w-[100%] h-[50%] flex justify-between">
              <div className="w-[40%] h-[100%] flex flex-col justify-start gap-1">
                <span className="text-base font-bold text-lightModeText">
                  Native Name:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.nativeName}
                  </span>
                </span>
                <span className="text-base font-bold text-lightModeText">
                  Population:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {populationConvert(countryDetailList.population)}
                  </span>
                </span>
                <span className="text-base font-bold text-lightModeText">
                  Region:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.region}
                  </span>
                </span>
                <span className="text-base font-bold text-lightModeText">
                  Sub Region:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.subregion || "N/A"}
                  </span>
                </span>
                <span className="text-base font-bold text-lightModeText">
                  Capital:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.capital}
                  </span>
                </span>
              </div>
              <div className="w-[40%] h-[100%] flex flex-col justify-start items-start g-1">
                <span className="text-base font-bold text-lightModeText">
                  Top Level Domain:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.tld}
                  </span>
                </span>
                <span className="text-base font-bold text-lightModeText">
                  Currencies:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.currencies || "N/A"}
                  </span>
                </span>
                <span className="text-base font-bol text-lightModeTextd">
                  Languages:{" "}
                  <span className="text-base font-light text-lightModeText">
                    {countryDetailList.capital}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex w-[100%] h-[10%] justify-start gap-2 items-center flex-wrap">
              <span className="text-lg font-bold text-lightModeText">
                Border Countries:{" "}
              </span>
              {countryDetailList[`borders`]?.map((border, ind) => (
                <div
                  key={ind}
                  className="w-[15%] h-[60%] flex justify-center items-center shadow rounded cursor-pointer bg-lightModeBackground"
                  onClick={() => setCountryDetail(borderCountry(border))}
                >
                  <span className="text-xs text-lightModeText">
                    {borderCountry(border)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}</>}
    </div>
  );
};

export default CountryDetail;
