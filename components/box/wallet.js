import React from 'react'
import { useState, useEffect } from "react"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEllipsisVertical, faWallet } from "@fortawesome/free-solid-svg-icons"
import {  } from "@fortawesome/free-regular-svg-icons"

const WalletBox = ({props, crslLength}) => {
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(props);
  
    return (
        <>
            {
                data.map((val, i, index) => {
                    if(i < 4 * crslLength){
                        if((crslLength > 1) && (i >= 4 * (crslLength -1)) && (i <= 4 * crslLength)){
                            return (
                                <div className='col-3 col pe-0' key={val.id}>
                                    <div className="box-highlight" key={i} crslLength={i+1}>
                                        <h6><FontAwesomeIcon icon={faWallet} width="18px"/> &nbsp;&nbsp;{val.wallet_name}</h6>
                                        <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                        <h5 className="box-main-text">Rp. {val.wallet_balance}</h5>
                                        <h6 className="box-secondary-text">Last Updated: </h6>
                                        <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                                    </div>
                                </div>
                            )
                        } else if(crslLength == 1){
                            return (
                                <div className='col-3 pe-0' key={val.id}>
                                    <div className="box-highlight" key={i} crslLength={i+1}>
                                        <h6><FontAwesomeIcon icon={faWallet} width="18px"/> &nbsp;&nbsp;{val.wallet_name}</h6>
                                        <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                        <h5 className="box-main-text">Rp. {val.wallet_balance}</h5>
                                        <h6 className="box-secondary-text">Last Updated: </h6>
                                        <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                                    </div>
                                </div>
                            )
                        }
                    } else {
                        return null;
                    }
                
                }
            )
        }
        </>
    )
}
  
export default WalletBox;
  