import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar/navbar"
import Welcome from "../../components/welcome/welcome"
import WalletBox from "../../components/box/wallet"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"
import BalanceTotalChart from "../../components/chart/balance/wallet"

export default function Mywallet() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);
    const crsl = Math.ceil(data.length / 4);
    const count = 0;

    useEffect(() => {
        fetch("http://localhost:3000/api/balance/wallet")
        .then(res => res.json())
          .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    },[])

    return (
        <div className={styles.container}>
            <Head>
                <title>My Wallet</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.body}>
                <main className={styles.main}>
                    <Navbar active={"mywallet"}/>
                    <Welcome/>
                    
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {                                      
                                Array.apply(null, Array(crsl)).map((val, i, index) => {
                                    if(i == 0){
                                        return (
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" key={i}></button>
                                        )
                                    } else {
                                        return (
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i.toString()} aria-label={"Slides "+ i.toString()} key={i}></button>
                                        )
                                    }
                                })   
                            }   
                        </div>
                        <div className="carousel-inner">
                            {                                        
                                Array.apply(null, Array(crsl)).map((val, i, index) => {
                                    function getClassCarousel(){
                                        if(i == 0){
                                            return "carousel-item active";
                                        } else {
                                            return "carousel-item";
                                        }
                                    }
                                    
                                    return (
                                        <div className={getClassCarousel()} key={i}>
                                            <div className='row pe-5'>
                                                <WalletBox props={data} crslLength={i+1}/>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <button className="carousel-control prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" title='Previous'>
                            <FontAwesomeIcon icon={faArrowLeft} width="20px"/>
                                <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" title='Next'>
                            <FontAwesomeIcon icon={faArrowRight} width="20px"/>
                                <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <BalanceTotalChart/>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
