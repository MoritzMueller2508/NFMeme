import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { BrowserRouter } from 'react-router-dom'

import Navbar from '../components/sections/Navbar/navbar'


const Home: NextPage = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <h1>Home</h1>
    </BrowserRouter>
  );
}

export default Home
