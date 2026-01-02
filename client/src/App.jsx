import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import Dashboard from './pages/admin/Dashboard'
import AddShow from './pages/admin/AddShow'
import ListShow from './pages/admin/ListShow'
import ListBookings from './pages/admin/ListBookings'
import Layout from './pages/admin/Layout'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
   {!isAdminRoute && <NavBar/> }
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/movies/:id' element={<MovieDetails/>} />
      <Route path='/movies/:id/:date' element={<SeatLayout/>} />
      <Route path='/my-bookings' element={<MyBookings/>} />
      <Route path='/favorite' element={<Favourite/>} />
      <Route path='/admin/*' element={<Layout/>}>
       <Route index element={<Dashboard/>} />
       <Route path='add-shows' element={<AddShow/>} />
       <Route path='list-shows' element={<ListShow/>} />
       <Route path='list-bookings' element={<ListBookings/>} />
      </Route>
    </Routes>
    {!isAdminRoute && <Footer/> }
    </>
  )
}

export default App