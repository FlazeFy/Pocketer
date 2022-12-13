import { useState, useEffect } from "react";

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faClose, faEllipsisVertical, faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Purchased() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [itemsWallet, setItemsWallet] = useState([]);

    //Form input
    const [purchased_name, setPurchasedName] = useState("");
    const [purchased_desc, setPurchasedDesc] = useState("");
    const [purchased_category, setPurchasedCategory] = useState("Food & Drink");
    const [purchased_price, setPurchasedPrice] = useState();
    const [purchased_wallet, setPurchasedWallet] = useState([]);

    var total = 0;
    var dateBefore = null;

    //Converter
    const data = Object.values(items);
    const dataWallet = Object.values(itemsWallet);

    useEffect(() => {
        fetch("http://localhost:3000/api/purchased",
            {
                method: "GET"
            }
        )
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

    useEffect(() => {
        fetch("http://localhost:3000/api/balance/wallet",
            {
                method: "GET"
            }
        )
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItemsWallet(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    async function addPurchased(e) {
        //e.preventDefault();
        const postData = async () => {
            //Get wallet id and balance
            let wallet = purchased_wallet;
            const splitBalance = wallet.split(",");

            //New wallet balance
            const newBalance = parseInt(splitBalance[1]) - parseInt(purchased_price);

            const purchased = {
                purchased_name: purchased_name,
                purchased_desc: purchased_desc,
                purchased_category: purchased_category,
                purchased_price: purchased_price,
                wallet_id: splitBalance[0],
                wallet_balance: newBalance
            };
        
            const response = await fetch("http://localhost:3000/api/purchased", {
                method: "POST",
                body: JSON.stringify(purchased)
            });
            return response.json();
        };
        postData().then((purchased) => {
            alert(purchased.msg);
        });
    }

    async function removePurchased(e, id, wallet_id, balance, price) {
        //e.preventDefault();
        const newBalance = parseInt(balance) + parseInt(price);

        const deleteData = async () => {
            const purchased = {
                id: id,
                wallet_balance: newBalance,
                wallet_id: wallet_id,
            };
        
            const response = await fetch("http://localhost:3000/api/purchased", {
                method: "DELETE",
                body: JSON.stringify(purchased)
            });
            return response.json();
        };
        deleteData().then((purchased) => {
            alert(purchased.msg);
        });
    }

    async function editPurchased(val) {
        //e.preventDefault();
        const putData = async () => {
            //Initial variable
            var pName;
            var pDesc;
            var pPrice;

            //Empty validator
            if(purchased_name != null && purchased_name != ""){
                pName = purchased_name
            } else {
                pName = val.purchased_name
            }
            if(purchased_desc != null && purchased_desc != ""){
                pDesc = purchased_desc
            } else {
                pDesc = val.purchased_desc
            }
            if(purchased_price != null && purchased_price != 0){
                pPrice = purchased_price
            } else {
                pPrice = val.purchased_price
            }

            const purchased = {
                id: val.id,
                purchased_name: pName,
                purchased_desc: pDesc,
                purchased_category: purchased_category,
                purchased_price: pPrice
            };
        
            const response = await fetch("http://localhost:3000/api/purchased", {
                method: "PUT",
                body: JSON.stringify(purchased)
            });
            return response.json();
        };
        putData().then((purchased) => {
            alert(purchased.msg);
        });
    }

    //Datechip
    function dateChip(datetime){
        const result = new Date(datetime);
        const month = result.toLocaleString('default', { month: 'short' }); 
        const now = new Date(Date.now());
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if(result.toDateString() === now.toDateString()){
            return (<div className="datechip">Today</div>);
        } else if(result.toDateString() === yesterday.toDateString()){
            return (<div className="datechip">Yesterday</div>);
        } else {
            return (<div className="datechip">{("0" + result.getDate()).slice(-2) + " " + month + " " + result.getFullYear()}</div>);
        }
    }

    //Edit modal
    function modalEdit(val){
        const modalId = "editPurchased"+val.id;

        return (
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="addPurchasedLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button className="btn btn-close-modal" title="Close" data-bs-dismiss="modal"><FontAwesomeIcon icon={faClose} width="14.5px"/></button>
                            <h6>Edit Purchased Item</h6>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id="floatingInput" onChange={(e)=> setPurchasedName(e.target.value)} defaultValue={val.purchased_name}></input>
                                <label htmlFor="floatingInput">Item Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <textarea className="form-control" id="floatingInput" rows="3" onChange={(e)=> setPurchasedDesc(e.target.value)} defaultValue={val.purchased_desc}></textarea>
                                <label htmlFor="floatingInput">Description (Optional)</label>
                            </div>
                            <div className="row my-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=> setPurchasedCategory(e.target.value)}>
                                            <option value="Food & Drink">Food & Drink</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Home Essentials">Home Essentials</option>
                                        </select>
                                        <label htmlFor="floatingInput">Item Category</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="floatingInput" defaultValue={val.purchased_price} min="1" onChange={(e)=> setPurchasedPrice(e.target.value)}></input>
                                        <label htmlFor="floatingInput">Item Price (Rp.)</label>
                                    </div>
                                </div>
                            </div>
                            <a className="btn-link-danger" onClick={(e) => removePurchased(e, val.id, val.wallet_id, val.wallet_balance, val.purchased_price)}><FontAwesomeIcon icon={faTrash} width="13.5px"/> Delete This Item</a>
                            <button className="btn btn-add-item" title="Submit" style={{ bottom: "20px", right:"-30px"}} onClick={(e) => editPurchased(val)}><FontAwesomeIcon icon={faFloppyDisk} width="16px"/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        function getBalance(income){
            if(income != ""){
                let wallet = income;
                const splitBalance = wallet.split(",");
                return splitBalance[1];
            } else {
                return "-";
            }
        }

        return (
            <>
                <div className="table-highlight">
                    <h6>Purchased</h6>
                    <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                    <div className="purchased-item-holder">
                        {
                            
                            data.map((val, i, index) => {
                                const result = new Date(val.purchased_created_at);
                                const now = new Date(Date.now());
                                const modalCall = "#editPurchased"+val.id;
                                
                                if(result.toDateString() == now.toDateString()){
                                    total += val.purchased_price;
                                }

                                if(dateBefore == null || dateBefore != result.toDateString()){
                                    dateBefore = result.toDateString();

                                    return(
                                        <div key={i}>
                                            {dateChip(val.purchased_created_at)}
                                            <button className="purchased-box" style={{borderLeft:"4px  solid #292735"}} key={i} data-bs-toggle="modal" data-bs-target={modalCall}>
                                                <h6>{val.purchased_name}</h6>
                                                <p><span style={{fontWeight:"500"}}>{val.purchased_category}</span>, {val.purchased_desc}</p>
                                                <h6 className="purchased-price">Rp. {val.purchased_price}</h6>
                                            </button>
                                            {modalEdit(val)}
                                        </div>
                                    );
                                } else {
                                    return(
                                        <div key={i}>
                                            <button className="purchased-box" style={{borderLeft:"4px  solid #292735"}} key={i} data-bs-toggle="modal" data-bs-target={modalCall}>
                                                <h6>{val.purchased_name}</h6>
                                                <p><span style={{fontWeight:"500"}}>{val.purchased_category}</span>, {val.purchased_desc}</p>
                                                <h6 className="purchased-price">Rp. {val.purchased_price}</h6>
                                            </button>
                                            {modalEdit(val)}
                                        </div>
                                    );
                                }                            
                            })
                        }
                    </div>
                    <div className="result_purchased-box">
                        <a>Today</a>
                        <h6>Rp. {total}</h6>
                    </div>
                    <button className="btn btn-scroll-purchased" title="Back to the top" style={{ bottom: "180px"}}><FontAwesomeIcon icon={faChevronUp} width="18.5px"/></button>
                    <button className="btn btn-remove-item" title="Remove All purchase" style={{ bottom: "120px"}}><FontAwesomeIcon icon={faTrash} width="14.5px"/></button>
                    <button className="btn btn-add-item" title="Add purchase" style={{ bottom: "60px"}} data-bs-toggle="modal" data-bs-target="#addPurchased"
                        ><FontAwesomeIcon icon={faPlus} width="14.5px"/></button>
                </div>
                <div className="modal fade" id="addPurchased" tabIndex="-1" aria-labelledby="addPurchasedLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button className="btn btn-close-modal" title="Close" data-bs-dismiss="modal"><FontAwesomeIcon icon={faClose} width="14.5px"/></button>
                                <h6>Add Purchased Item</h6>
                                <div className="form-floating mt-3">
                                    <input type="text" className="form-control" id="floatingInput" onChange={(e)=> setPurchasedName(e.target.value)}></input>
                                    <label htmlFor="floatingInput">Item Name</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <textarea className="form-control" id="floatingInput" rows="3" onChange={(e)=> setPurchasedDesc(e.target.value)}></textarea>
                                    <label htmlFor="floatingInput">Description (Optional)</label>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=> setPurchasedCategory(e.target.value)}>
                                                <option value="Food & Drink">Food & Drink</option>
                                                <option value="Transport">Transport</option>
                                                <option value="Home Essentials">Home Essentials</option>
                                            </select>
                                            <label htmlFor="floatingInput">Item Category</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating">
                                            <input type="number" className="form-control" id="floatingInput" min="1" onChange={(e)=> setPurchasedPrice(e.target.value)}></input>
                                            <label htmlFor="floatingInput">Item Price (Rp.)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=> setPurchasedWallet(e.target.value)}>
                                                <option selected>-choose your wallet-</option>
                                                {
                                                    dataWallet.map((val, i, index) => {
                                                        return(
                                                            <option value={[val.id, val.wallet_balance]} key={i}>{val.wallet_name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="floatingInput">From Wallet</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="m-0">Wallet Balance</p>
                                        <h5 className="ms-4" style={{color:"#8e57f7", fontWeight:"bold"}}>Rp. {getBalance(purchased_wallet)}</h5>
                                    </div>
                                </div>
                                <button className="btn btn-add-item" title="Submit" style={{ bottom: "20px", right:"-30px"}} onClick={(e) => addPurchased()}><FontAwesomeIcon icon={faFloppyDisk} width="16px"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
