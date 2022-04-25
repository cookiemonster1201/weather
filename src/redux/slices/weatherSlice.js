import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherAction = createAsyncThunk(
  "weather/fetchWeather",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
          const { data } = await axios.get(`/weather?q=${payload}&appid=d0aef4da9ac1a34e09e4ce9ff137ae24&units=imperial`);
          return data;
      } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


const weatherSlices = createSlice({
  name: "weather",
    initialState: { weather:null,loading:false,error:null },
  extraReducers: builder => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.error = action?.payload;
      state.loading = false;
    });
  },
});

export default weatherSlices.reducer;