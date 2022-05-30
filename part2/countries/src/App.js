import { useEffect, useState } from "react";
import axios from "axios";


const WeatherBox = ({ city }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, []);
  return (
    <div>
      <h2>Weather in {city}</h2>
      {weather
        ? (<>
          <p>Temperature: {(weather.main.temp - 273).toFixed(2)} °C</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
          <p>Wind {weather.wind.speed} m/s</p>
        </>)
        : <p>Loading...</p>
      }
    </div>
  )
}

const CountryList = ({ countries, onSelectCountry }) => {
  const handleSelectingCountry = (event) => {
    event.preventDefault();
    const countryIndex = event.target.querySelector("#country_index").value;
    const country = countries[countryIndex];
    onSelectCountry(country);
  }
  return (
    <ul style={{ listStyleType: "none", paddingInlineStart: 5 }}>
      {countries.map((country, index) =>
        <li key={country.cca3}>
          <form onSubmit={handleSelectingCountry}>{country.name.common}
            <input type="hidden" id="country_index" value={index} />
            <input type="submit" value="show" />
          </form>
        </li>)}
    </ul>
  )
}

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital.join(", ")}</p>
    <p>Area: {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.entries(country.languages).map(([lang, name]) =>
        <li key={lang}>{name}</li>)}
    </ul>
    <img alt={`Flag of ${country.name.common}`} src={country.flags.png} />
    {country.capital.map((city) => <WeatherBox key={city} city={city} />)}
  </div>
)

const Countries = ({ countries, onSelectCountry }) => {
  if (countries.length > 10) {
    return <p>Too many countries!</p>
  } else if (countries.length > 1) {
    return <CountryList countries={countries} onSelectCountry={onSelectCountry} />
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  } else {
    return <p>No country found!</p>
  }
}

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  const searchCountries = (countries, text) => {
    return countries.filter(
      (country) => {
        return country.name.common.toLowerCase().includes(
          text.toLowerCase())
      })
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
        setSelectedCountries(searchCountries(response.data, searchedCountry));
      })
  }, []);

  const handleSearchedCountryChange = (event) => {
    // setSearchedCountry only changes thte searchCountry variable *after* 
    // the handlers is finished. We need to use temporary variable to modify both
    // searchedCountry and selectedCountries
    const newSearchedCountry = event.target.value
    setSearchedCountry(newSearchedCountry)
    setSelectedCountries(searchCountries(countries, newSearchedCountry));
  }

  const hadleSelectingCountry = (country) => {
    setSelectedCountries([country]);
  }

  return (
    <div className="App">
      <div>
        <p>Find countries
          <input value={searchedCountry} onChange={handleSearchedCountryChange} /></p>
      </div>
      <Countries countries={selectedCountries} onSelectCountry={hadleSelectingCountry} />
    </div>
  );
}

export default App;
