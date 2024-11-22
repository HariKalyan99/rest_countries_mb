import { createContext, useEffect, useState } from "react";
import Navigation from "./Components/Navigation";
import SearchMedia from "./Components/SearchMedia";
import CountryDashboard from "./Components/CountryDashboard";

export const modeContext = createContext({
  switchTheme: () => {},
  getTheme: false,
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
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [onlyRegionCountries, setOnlyRegionCountries] = useState("");



  const [countryDeatil, setCountryDetail] = useState("");
  const [countryDetailList, setCountryDetailList] = useState([]);

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


  useEffect(() => {
    const fetchSpecificCountry = async (country) => {
        try {
          const data = await fetch(`https://restcountries.com/v3.1/name/${country}`);
          const jsonData = await data.json();
          if (jsonData) {
            console.log(convertCountryList(jsonData));
            setCountryDetailList(convertCountryList(jsonData));
          }
        } catch (error) {
          console.log(error);
        }
    };
    if (countryDeatil?.length >= 1) {
      fetchSpecificCountry(countryDeatil);
    }
  }, [countryDeatil]);

  const specificRegion = (region) => {
    setRegion(region);
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
        countryObj["country"][`countryName`] = common;
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

  const convertRegionList = (jsonData) => {
    return jsonData.reduce((acc, { region }) => {
      acc.push(region);
      return [...new Set(acc)];
    }, []);
  };


  const countryDeatilFn = (country) => {
    // console.log(country)
    setCountryDetail(country);
  }

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

        <SearchMedia
          setCountry={setCountry}
          getCountry={getCountry}
          specificRegion={specificRegion}
          regionList={regionList}
        />

        {countryList?.length > 0 && (
          <CountryDashboard countryDeatilFn={countryDeatilFn} countryList={countryList} />
        )}
      </div>
    </modeContext.Provider>
  );
}

export default App;

// restricted to use context hook?
// filter and search?
