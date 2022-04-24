import React from 'react'
import MainPage from './pages/MainPage';
import './App.css';
// import InfoCard from './pages/InfoCard';
import { Routes,Route } from 'react-router-dom';
function App() {

  return (
      <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        {/* <Route path='/details/:name' exact element={<InfoCard/>}/> */}
      </Routes>
  )
}

export default App;
