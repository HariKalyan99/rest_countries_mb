import { createContext, useEffect, useState } from "react";
import Navigation from "./Components/Navigation";
import SearchMedia from "./Components/SearchMedia";
import CountryDashboard from "./Components/CountryDashboard";

export const modeContext = createContext({
  switchTheme: () => {},
  getTheme: false,
});

function App() {
  //Theme mode states.
  const [getTheme, setTheme] = useState(false);

  //country list array

  const [countryList, setCountryList] = useState([]);
  const [getCountry, setCountry] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchCountries = async () => {
      try {
        const data = await fetch("https://restcountries.com/v3.1/all", signal);
        const jsonData = await data.json();
        setCountryList(convertCountryList(jsonData));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {

    const controller = new AbortController();
    const { signal } = controller;
    const fetchCountry = async (country) => {
      if(country?.length){
        try {
          const data = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
          );
          const jsonData = await data.json();
          setCountryList(convertCountryList(jsonData));
          // setCountryList();
        } catch (error) {
          console.log(error);
        }
      }
    };


    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(async() => {
      if (getCountry?.length > 0) {
        fetchCountry(getCountry);
      }else {
        try {
          const data = await fetch("https://restcountries.com/v3.1/all", signal);
          const jsonData = await data.json();
          setCountryList(convertCountryList(jsonData));
        } catch (error) {
          console.log(error);
        }
      }
    }, 600);

    setDebounceTimer(newTimer);

    return () => {
      controller.abort();
    };
  }, [getCountry]);

  const specificCountries = (country) => {
    setCountry(country);
  };

  const switchTheme = () => {
    setTheme(!getTheme);
  };

  const convertCountryList = (jsonData) => {
    return jsonData.reduce(
      (acc, { capital, flags, name, population, region }) => {
        let countryObj = {};
        const { svg, png } = flags;
        const { common } = name;
        countryObj["country"] = countryObj["country"] || {};
        countryObj["country"][`countrynName`] = common;
        countryObj["country"]["capital"] = capital;
        countryObj["country"]["flag"] = svg || png;
        countryObj["country"]["population"] = population;
        countryObj["country"]["region"] = region;
        acc.push(countryObj);
        return acc;
      },
      []
    );
  };

  return (
    <modeContext.Provider value={{ switchTheme, getTheme }}>
      <div
        style={{
          backgroundColor: `${getTheme ? "black" : "white"}`,
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Navigation />

        <SearchMedia specificCountries={specificCountries} />

        <CountryDashboard countryList={countryList} />
      </div>
    </modeContext.Provider>
  );
}

export default App;
