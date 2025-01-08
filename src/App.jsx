import React from 'react'
import { Routes, Link, Route, NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Components/Home'
import Series from './Components/Series'
import Team from './Components/Team'
import Players from './Components/Players'
import LiveMatches from './Components/LiveMatches'
import RecentMatches from './Components/RecentMatches'
import UpcomingMatches from './Components/UpcomingMatches'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/series' element={<Series/>}></Route>
        <Route path='/team' element={<Team/>}></Route>
        <Route path='/players' element={<Players/>}></Route>
        <Route path='/matches/live' element={<LiveMatches/>}></Route>
        <Route path='/matches/recent' element={<RecentMatches/>}></Route>
        <Route path='/matches/upcoming' element={<UpcomingMatches/>}></Route>
      </Routes>
      </div>
    </>
  )
}

export default App
