import React from 'react'

const CountryCard = ({country}) => {      
    
    
   
  return (
    <div
        style={{
          height: "450px",
          width: "350px",
          border: "1px solid",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          
        }}
      >
        <div style={{ width: "100%", height: "45%", border: "1px solid" }}>
          <img
            src={country.flag}
            alt={"photo"}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div
          style={{
            width: "80%",
            height: "55%",
            border: "1px solid",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <span>Country</span>
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <span>Population: 46,88,88,8</span>
            <span>Region: Europe</span>
            <span>Capital: Berlin</span>
          </div>
        </div>
      </div>
  )
}

export default CountryCard
