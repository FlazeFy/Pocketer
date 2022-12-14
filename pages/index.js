import Head from 'next/head'
import Welcome from '../components/welcome/welcome'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar/navbar'
import landing_img from '../public/landing-img-1.png'
import Image from 'next/image'

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
          <div className='mt-5'>
            <div className='row'>
              <div className='col-lg-7 col-md-7 col-sm-12'>
                <h1 className={styles.app_title}>Welcome to <span style={{color:"#8e57f7"}}>Pocketer</span></h1>
                <h3 className={styles.app_subtitle}>The best solution for your <span style={{color:"#8e57f7"}}>Financial Management</span></h3>
              </div>
              <div className='col-lg-5 col-md-5 col-sm-12'>
                <Image src="/landing-img-1.png" alt="me" width="350" height="350"/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
