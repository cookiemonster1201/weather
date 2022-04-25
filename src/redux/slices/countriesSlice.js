import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCountries } from "../countries/countriesSelectors";
// axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';

const updateElById = (arr, idx, updateData) => arr.map((item, id, arr) => arr.indexOf(item) === idx ? updateData : item)

const deleteCity = (arr, name) => {
  console.log(arr, name)
  return arr.filter((el) => name !== el)
}

export const updateWeatherAction = createAsyncThunk(
  "weather/updateWeather",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const { lat, lon, idx } = payload;
        try {
          const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d0aef4da9ac1a34e09e4ce9ff137ae24&units=imperial`);
          return {data, idx}
      } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

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
        // updateCountry: (state, {payload}) => {state.arr = updateElById(state.arr, payload.idx, payload.data)}
        
    },
    extraReducers: {
          [updateWeatherAction.pending]: (state, action) => {
            state.loading = true;
            },
          [updateWeatherAction.fulfilled]: (state, { payload }) => {
            state.arr = updateElById(state.arr, payload.idx, payload.data)
            },
        //     .addCase(updateWeatherAction.fulfilled, (state, {payload}) => {
        //             state.loading = false,
        //             state.error = null
        //         }
        // )
        //     .addCase(updateWeatherAction.fulfilled, (state, action) => {
        //         const findIndex = state.arr.reduce((acc, country, index) => 
        //             if (country.name === action.payload.name) {
        //                 return acc += index
        //             }
        //             return acc;
        //         }, 0)
        //         return {
        //             state.arr[findIndex] = action.payload,
        //             state.loading = false,
        //             state.error = null
        //         }
        //     }
        // )
        [updateWeatherAction.rejected]: (state, action) => {
            state.error = action?.payload;
            state.loading = false;
            }
          }  
})


export const { addCountry,removeCountry } = countriesSlice.actions;
export default countriesSlice.reducer;