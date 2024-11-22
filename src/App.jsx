import { createContext, useEffect, useState } from "react";
import Navigation from "./Components/Navigation";
import SearchMedia from "./Components/SearchMedia";
import CountryDashboard from "./Components/CountryDashboard";
import CountryDetail from "./Components/CountryDetail";
import { Outlet } from "react-router-dom";

export const modeContext = createContext({
  switchTheme: () => {},
  getTheme: false,
  setPageSwitch: () => {},
  pageSwitch: false,
  countryList: [],
  countryDeatilFn: () => {},
  countryDeatil: []
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

  const [pageSwitch, setPageSwitch] = useState(false);



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
              localStorage.setItem("countryList", JSON.stringify(convertCountryList(jsonData)))
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



  // border preparation

  useEffect(() => {
    const addBorder = async (countriesArr) => {
      let borderObj = {};
      for(let i = 0; i<countriesArr.length; i++){
        const {country} = countriesArr[i];
        const {countryName, region} = country;
        let ans = await fetchSpecificBorder(region, countryName);
        borderObj[countryName] = borderObj[countryName] || []
        borderObj[countryName] = [...ans]
      }
      localStorage.setItem("borderList", JSON.stringify(borderObj))
    }

    if(JSON.parse(localStorage.getItem("countryList"))?.length > 0){
      addBorder(JSON.parse(localStorage.getItem("countryList")))
    }
  }, [])

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


 

  const specificRegion = (region) => {
    setRegion(region);
  };

  const switchTheme = () => {
    setTheme(!getTheme);
  };

  const fetchSpecificBorder = async(region, countryName) => {
    try {
        const data = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        const jsonData = await data.json();
        return jsonData.filter(x => x["name"]["common"] === countryName)[0]?.borders || ["no borders"]
      } catch (error) {
        console.log(error);
      }
}



  const convertCountryList = (jsonData) => {
    
    return jsonData.reduce(
      (acc, { capital, flags, name, population, region, tld, subregion, currencies, borderCountries }) => {
        let countryObj = {};
        const { svg, png } = flags;
        const { common, nativeName } = name;
        let native;
        let currency;
        for(let key in nativeName){
          native = nativeName[key]["common"];
        }

        for(let key in currencies){
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
    setPageSwitch(!pageSwitch)
    setCountryDetail(country);
  }

  return (
    <modeContext.Provider value={{ switchTheme, getTheme,setPageSwitch
     , pageSwitch,
      countryList,
      countryDeatilFn, countryDeatil }}>
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

        <Outlet />
      </div>
    </modeContext.Provider>
  );
}

export default App;

// restricted to use context hook?
// filter and search?
