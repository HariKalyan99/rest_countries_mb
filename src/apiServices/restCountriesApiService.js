class RestCountry {
    getAllCountries = async(url, signal) => {
        try {
            const data = await fetch(
              `${url}`, {
                signal
              }
            );
            const jsonData = await data.json();
            return jsonData;
          } catch (error) {
            throw error
          }
    }

    getACountry = async(url, country) => {
        try {
            const data = await fetch(
              `${url}${country}`
            );
            const jsonData = await data.json();
            return jsonData;
          } catch (error) {
            throw error
          }
    }


    getRegionalCountries = async(url, region) => {
        try {
            const data = await fetch(
              `${url}${region}`
            );
            const jsonData = await data.json();
            return jsonData;
          } catch (error) {
            throw error
          }
    }
}


export default RestCountry;