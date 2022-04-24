import React, { useState,useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchWeatherAction } from '../redux/slices/weatherSlice';
import { getSearchedWeather } from '../redux/weather/weatherSelectors';
import { getCountries } from '../redux/countries/countriesSelectors';
import { addCountry,removeCountry, updateWeatherAction } from '../redux/slices/countriesSlice';
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

    console.log('cities', cities)


    useEffect(() => {
      console.log('countries', countries)
      try {
      countries.forEach(async (country) => {
          const { data } = await axios.get(`/weather?q=${country}&appid=7318f9d16165f2ed696d529c2a4bcc86&units=imperial`);
          setCities(prev => {
            if (!prev.includes(data)) {
              return [...prev, data]
            } else {
              return prev
            }
          })
          
      })
    } catch (error) {
      console.log('error', error)
    }
    }, [countries]);

    const { weather, loading } = searchCountry;

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
      {cities.length > 0 ? (
        <ul style={{display:'flex', flexWrap:'wrap', margin:'0 auto'}}>
          {cities.map((c,idx) => (
            <li style={{ border: '1px solid black',cursor:'pointer' }} key={uuidv4()}><p>{c.name}</p>
              <p>{console.log('c.id', c.id)}</p>
                  <p>{c.dt}</p>
                  <div>
                      <Link to={`/details/${c.name}`}>Details</Link>
                  </div>
                  <button onClick={() => dispatch(removeCountry(c.name))}>remove</button>
                  <button onClick={() => {
                      dispatch(updateWeatherAction({ lon: c.coord.lon, lat: c.coord.lat, idx: idx }))
                  }
                  }>update</button>
            </li>))}
      </ul>
          ):(<h4>No favourites HERE</h4>)}
</>)
}
