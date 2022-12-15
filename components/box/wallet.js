import React from 'react'
import { useState, useEffect } from "react"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faEdit, faEllipsisVertical, faFloppyDisk, faTrash, faWallet } from "@fortawesome/free-solid-svg-icons"
import {  } from "@fortawesome/free-regular-svg-icons"

const WalletBox = ({props, crslLength}) => {
    const [items, setItems] = useState([]);

    //Form input
    const [wallet_name, setWalletName] = useState("");
    const [wallet_desc, setWalletDesc] = useState("");
    const [wallet_type, setWalletType] = useState("E-Money");
    const [wallet_balance, setWalletBalance] = useState();

    //Converter
    const data = Object.values(props);

    async function editWallet(val) {
        //e.preventDefault();
        const putData = async () => {
            //Initial variable
            var wName;
            var wDesc;
            var wBalance;

            //Empty validator
            if(wallet_name != null && wallet_name != ""){
                wName = wallet_name
            } else {
                wName = val.wallet_name
            }
            if(wallet_desc != null && wallet_desc != ""){
                wDesc = wallet_desc
            } else {
                wDesc = val.wallet_desc
            }
            if(wallet_balance != null && wallet_balance != 0){
                wBalance = wallet_balance
            } else {
                wBalance = val.wallet_balance
            }

            const wallet = {
                id: val.id,
                wallet_name: wName,
                wallet_desc: wDesc,
                wallet_type: wallet_type,
                wallet_balance: wBalance
            };
        
            const response = await fetch("http://localhost:3000/api/balance/wallet", {
                method: "PUT",
                body: JSON.stringify(wallet)
            });
            return response.json();
        };
        putData().then((wallet) => {
            alert(wallet.msg);
        });
    }

    async function removeWallet(e, id) {
        //e.preventDefault();
        const deleteData = async () => {
            const balance = {
                id: id,
            };
        
            const response = await fetch("http://localhost:3000/api/balance/wallet", {
                method: "DELETE",
                body: JSON.stringify(balance)
            });
            return response.json();
        };
        deleteData().then((balance) => {
            alert(balance.msg);
        });
    }

    //Edit modal
    function modalEdit(val){
        const modalId = "editWallet"+val.id;

        return (
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="addWalletLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button className="btn btn-close-modal" title="Close" data-bs-dismiss="modal"><FontAwesomeIcon icon={faClose} width="14.5px"/></button>
                            <h6>Edit Wallet</h6>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id="floatingInput" onChange={(e)=> setWalletName(e.target.value)} defaultValue={val.wallet_name}></input>
                                <label htmlFor="floatingInput">Wallet Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <textarea className="form-control" id="floatingInput" rows="3" onChange={(e)=> setWalletDesc(e.target.value)} defaultValue={val.wallet_desc}></textarea>
                                <label htmlFor="floatingInput">Description (Optional)</label>
                            </div>
                            <div className="row my-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=> setWalletType(e.target.value)}>
                                            <option value="E-Money">E-Money</option>
                                            <option value="Bank">Bank</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Retirement Savings">Retirement Savings</option>
                                        </select>
                                        <label htmlFor="floatingInput">Wallet Type</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="floatingInput" defaultValue={val.wallet_balance} min="1" onChange={(e)=> setWalletBalance(e.target.value)}></input>
                                        <label htmlFor="floatingInput">Wallet Balance (Rp.)</label>
                                    </div>
                                </div>
                            </div>
                            <a className="btn-link-danger" onClick={(e) => removeWallet(e, val.id)}><FontAwesomeIcon icon={faTrash} width="13.5px"/> Delete This Wallet</a>
                            <button className="btn btn-add-item" title="Submit" style={{ bottom: "20px", right:"-30px"}} onClick={(e) => editWallet(val)}><FontAwesomeIcon icon={faFloppyDisk} width="16px"/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  
    return (
        <>
            {
                data.map((val, i, index) => {
                    if(i < 4 * crslLength){
                        const modalCall = "#editWallet"+val.id;

                        if((crslLength > 1) && (i >= 4 * (crslLength -1)) && (i <= 4 * crslLength)){
                            return (
                                <div className='col-3 col pe-0' key={val.id}>
                                    <div className="box-highlight" key={i} crslLength={i+1}>
                                        <h6><FontAwesomeIcon icon={faWallet} width="18px"/> &nbsp;&nbsp;{val.wallet_name}</h6>
                                        <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                        <h5 className="box-main-text">Rp. {val.wallet_balance}</h5>
                                        <h6 className="box-secondary-text">Last Updated: </h6>
                                        <button className="btn btn-outline-more box-more" title="Edit wallet" data-bs-toggle="modal" data-bs-target={modalCall}><FontAwesomeIcon icon={faEdit} width="16px"/></button>
                                    </div>
                                    {modalEdit(val)}
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
                                        <button className="btn btn-outline-more box-more" title="Edit wallet" data-bs-toggle="modal" data-bs-target={modalCall}><FontAwesomeIcon icon={faEdit} width="16px"/></button>
                                    </div>
                                    {modalEdit(val)}
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
  