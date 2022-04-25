import { createSlice } from "@reduxjs/toolkit";

// axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';


const deleteCity = (arr, name) => {
  console.log(arr, name)
  return arr.filter((el) => name !== el)
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        arr: [],
        error: null,
        loading:false
    },
    reducers: {
        addCountry: (state, { payload }) => {
          state.arr = !state.arr.includes(payload) ? [...state.arr, payload] : state.arr
        },
        removeCountry: (state, { payload }) => {
          state.arr = [...deleteCity(state.arr, payload)]
        },        
    }, 
})


export const { addCountry,removeCountry } = countriesSlice.actions;
export default countriesSlice.reducer;