// import React from 'react'
// import { useSelector } from 'react-redux'
// import { getCountries } from '../redux/countries/countriesSelectors';
// import { Link, useParams } from 'react-router-dom'


// export default function InfoCard() {
//     const { name } = useParams()
//     const countries = useSelector(getCountries)
//     const country = countries.find(c => c.name === name)
//     const celcius = Math.round(country.main.temp - 273.15);
//     console.log('country--',country);
    
//     return (
//       <>
//           <div>
//               {/* <p>{country.name}</p> */}
//             <p>{Math.ceil(Number(country?.main.temp))}{" "}°C</p>
//             <p>{country.weather[0].main}</p>
//             <p>{country.name}{", "}{country.sys.country}</p>
//             <Link to="/">Back</Link>
//           </div>
//       </>
//   )
// }