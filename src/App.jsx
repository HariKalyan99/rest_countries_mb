import { createContext, useEffect, useState } from "react";
import Navigation from "./Components/Navigation";
import { Outlet } from "react-router-dom";

export const modeContext = createContext({
  switchTheme: () => {},
  getTheme: false,
  countryList: [],
  countryDeatilFn: () => {},
  countryDeatil: [],
  setCountryDetail: () => {},
  setCountry: () => {},
  getCountry: "",
  specificRegion: () => {},
  regionList: "",
  populationConvert: () => {}
});



let regionalCountryCopy;
function App() {
  //Theme mode states.
  const [getTheme, setTheme] = useState(false);

  //country list array

  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [getCountry, setCountry] = useState("");
  const [getRegion, setRegion] = useState("");
  // const [debounceTimer, setDebounceTimer] = useState(null);
  const [onlyRegionCountries, setOnlyRegionCountries] = useState("");

  const [countryDeatil, setCountryDetail] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchCountry = async (country) => {
      if (
        onlyRegionCountries?.length > 0 &&
        regionList.includes(onlyRegionCountries)
      ) {
        if (country?.length > 0) {
          setCountryList(
            regionalCountryCopy.filter(
              (x) =>
                x["country"].countryName.toLowerCase().indexOf(country) !== -1
            )
          );
        } else if (!country) {
          try {
            const data = await fetch(
              `https://restcountries.com/v3.1/region/${getRegion}`
            );
            const jsonData = await data.json();
            if (jsonData) {
              setCountryList(convertCountryList(jsonData));
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if (country?.length >= 1) {
          try {
            const data = await fetch(
              `https://restcountries.com/v3.1/name/${country}`
            );
            const jsonData = await data.json();
            if (jsonData) {
              setCountryList(convertCountryList(jsonData));
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const data = await fetch(
              "https://restcountries.com/v3.1/all",
              signal
            );
            const jsonData = await data.json();
            if (jsonData) {
              localStorage.setItem(
                "countryList",
                JSON.stringify(convertCountryList(jsonData))
              );
              setRegionList(convertRegionList(jsonData));
              setCountryList(convertCountryList(jsonData));
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    fetchCountry(getCountry);

    return () => {
      controller.abort();
    };
  }, [getCountry]);

  useEffect(() => {
    const fetchRegionalCountries = async (region) => {
      if (region === "All") {
        try {
          const data = await fetch("https://restcountries.com/v3.1/all");
          const jsonData = await data.json();
          if (jsonData) {
            setOnlyRegionCountries("");
            setCountry("");
            setCountryList(convertCountryList(jsonData));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const data = await fetch(
            `https://restcountries.com/v3.1/region/${region}`
          );
          const jsonData = await data.json();
          if (jsonData) {
            setCountry("");
            setOnlyRegionCountries(region);
            regionalCountryCopy = convertCountryList(jsonData);
            console.log(regionalCountryCopy);
            setCountryList(convertCountryList(jsonData));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (getRegion?.length > 0) {
      fetchRegionalCountries(getRegion);
    }
  }, [getRegion]);

  const specificRegion = (region) => {
    setRegion(region);
  };

  const switchTheme = () => {
    setTheme(!getTheme);
  };

  const convertCountryList = (jsonData) => {
    return jsonData.reduce(
      (
        acc,
        {
          capital,
          flags,
          name,
          population,
          region,
          tld,
          subregion,
          currencies,
          borderCountries,
          cca3,
          cca2,
          borders,
        }
      ) => {
        let countryObj = {};
        const { svg, png } = flags;
        const { common, nativeName } = name;
        let native;
        let currency;
        for (let key in nativeName) {
          native = nativeName[key]["common"];
        }

        for (let key in currencies) {
          currency = key;
        }

        countryObj["country"] = countryObj["country"] || {};
        countryObj["country"][`countryName`] = common;
        countryObj["country"]["capital"] = capital;
        countryObj["country"]["flag"] = svg || png;
        countryObj["country"]["population"] = population;
        countryObj["country"]["region"] = region;
        countryObj["country"]["subregion"] = subregion;
        countryObj["country"]["tld"] = tld;
        countryObj["country"]["currencies"] = currency;
        countryObj["country"]["nativeName"] = native;
        countryObj["country"]["borderCountries"] = borderCountries;
        countryObj["country"]["border1"] = cca3;
        countryObj["country"]["border2"] = cca2;
        countryObj["country"]["borders"] = borders || ["no borders"];

        acc.push(countryObj);
        return acc;
      },
      []
    );
  };

  const convertRegionList = (jsonData) => {
    return jsonData.reduce((acc, { region }) => {
      acc.push(region);
      return [...new Set(acc)];
    }, []);
  };

  const countryDeatilFn = async (country) => {
    setCountryDetail(country);
  };

  const populationConvert = (val) => {
    let intlFormat = new Intl.NumberFormat('en-US')
    return intlFormat.format(val)
  }

  

  return (
    <modeContext.Provider
      value={{
        switchTheme,
        getTheme,
        countryList,
        countryDeatilFn,
        countryDeatil,
        setCountryDetail,
        setCountry,
        getCountry,
        specificRegion,
        regionList,
        populationConvert
      }}
    >
      <div
        className={`w-full flex justify-start flex-col items-center h-full min-h-[100vh] ${
          getTheme ? "bg-darkModeBackground" : "bg-lightModeBackground"
        }`}
      >
        <Navigation />

        <Outlet />
      </div>
    </modeContext.Provider>
  );
}

export default App;

// do we have to persist the data and work on the functionality or is it mandatory to do api calls?
