import React from 'react'

const CountryCard = ({country}) => {      
    
    const {
        countryName,
        capital,
        flag,
        population,
        region} = country;
   
  return (
    <div
        style={{
          height: "340px",
          width: "290px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "1px 1px 5px grey", // need to give the body color
          borderRadius: "0.5rem",
          overflow: "hidden"
          
        }}
      >
        <div style={{ width: "100%", height: "49%", }}>
          <img
            src={flag}
            alt={"photo"}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div
          style={{
            width: "80%",
            height: "51%",
            
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <span style={{fontSize: "1.2rem", fontWeight: "bold"}}>{countryName}</span>
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <span style={{fontSize: "1rem"}}>Population: {population}</span>
            <span style={{fontSize: "1rem"}}>Region: {region}</span>
            <span style={{fontSize: "1rem"}}>Capital: {capital}</span>
          </div>
        </div>
      </div>
  )
}

export default CountryCard
