import type { NextPage } from 'next'
import React from 'react'
import styles from '../styles/Home.module.css'
import { Wallet } from './components/phantom/Wallet'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Wallet></Wallet>
    </div>
  )
}

export default Home
