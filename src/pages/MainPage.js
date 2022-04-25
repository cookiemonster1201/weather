import React, { useState,useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchWeatherAction } from '../redux/slices/weatherSlice';
import { getSearchedWeather } from '../redux/weather/weatherSelectors';
import { getCountries } from '../redux/countries/countriesSelectors';
import { addCountry,removeCountry } from '../redux/slices/countriesSlice';
import axios from 'axios';


export default function MainPage() {
    const dispatch = useDispatch();
    const searchCountry = useSelector(getSearchedWeather)
    const countries = useSelector(getCountries);
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);

    const onHandleChange = (e) => {
      setCity(e.target.value)
    }

    const onHandleSearch = () => {
      dispatch(fetchWeatherAction(city))
      setCity('')
    }

    useEffect(() => {
      const newCities = [];
      for (let i = 0; i < countries.length; i++) {
        cities.forEach(city => {
          if (city.name === countries[i]) {
            newCities.push(city)
          }
        })
      }

      setCities(newCities)
      
      countries?.forEach((country) => {
          axios.get(`/weather?q=${country}&appid=d0aef4da9ac1a34e09e4ce9ff137ae24&units=imperial`).then(({data}) => {
            setCities(pr => {
              console.log('pr', pr)
              if (pr && pr?.find(c => c.name === country)) {
                return pr
              }
              console.log('lllll')
            return [...pr, data]
          });
      })
    })
    console.log('cities', cities)
    }, [countries]);

    async function updateCity({lat, lon, name}) {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d0aef4da9ac1a34e09e4ce9ff137ae24&units=imperial`);
      setCities(prev => {
        return prev.map(city => {
          if (city.name === name) {
            return data;
          } else {
            return city;
          }
        })
      })
    }

    const { weather, loading } = searchCountry;

    const sortedCities = [];
    if (countries.length === cities.length) {
      countries.forEach(c => {
        sortedCities.push(cities.find(({name}) => name === c))
      }) 
    }
    
      return (
          <>
            <h1>
          Hello world
            </h1>
            <input placeholder='Enter city' value={city} onChange={onHandleChange} />
        <button onClick={onHandleSearch}>Search</button>
          {weather ? (
        <div style={{margin:'0 auto', background:'grey', width:'150px'}}>
          <p>{weather.name}</p>
          <p>{weather.id}</p>
          <p>{weather.dt}</p>
          <button onClick={()=>dispatch(addCountry(weather.name))}>add to your countries</button>
        </div>
      ) :
        (<h2>make a search</h2>)}
      <h3>Your favourites countries</h3>
      {sortedCities.length > 0 ? (
        <ul style={{display:'flex', flexWrap:'wrap', margin:'0 auto'}}>
          {sortedCities.map((c) => (
            <li style={{ border: '1px solid black',cursor:'pointer' }} key={uuidv4()}><p>{c.name}</p>
                  <p>{c.dt}</p>
                  <div>
                      <Link to={`/details/${c.name}`}>Details</Link>
                  </div>
                  <button onClick={() => dispatch(removeCountry(c.name))}>remove</button>
                  <button onClick={() => updateCity({ lon: c.coord.lon, lat: c.coord.lat, name: c.name })
                  }>update</button>
            </li>))}
      </ul>
          ):(<h4>No favourites HERE</h4>)}
</>)
}
