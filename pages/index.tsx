import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar/navbar'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <h1>Home</h1>
    </>
  );
}

export default Home
