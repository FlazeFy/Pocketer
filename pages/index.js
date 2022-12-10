import Head from 'next/head'
import Welcome from '../components/welcome/welcome'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar/navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.body}>
        <main className={styles.main}>
          <Navbar/>
          <Welcome/>
          
        </main>
      </div>
    </div>
  )
}
