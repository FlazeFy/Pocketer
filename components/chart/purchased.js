import { useState, useEffect } from "react";

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faEllipsisVertical, faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Purchased() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var total = 0;

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:3000/api/purchased")
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className="table-highlight">
                    <h6>Purchased</h6>
                    <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                    <div className="purchased-item-holder">
                        <div className="datechip">Today</div>
                        {
                            data.map((val, i, index) => {
                                total += val.purchased_price;
                                return(
                                    <div className="purchased-box" style={{borderLeft:"4px  solid #292735"}} key={i}>
                                        <h6>{val.purchased_name}</h6>
                                        <p><span style={{fontWeight:"500"}}>{val.purchased_category}</span>, {val.purchased_desc}</p>
                                        <h6 className="purchased-price">Rp. {val.purchased_price}</h6>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="result_purchased-box">
                        <a>Today</a>
                        <h6>Rp. {total}</h6>
                    </div>
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
                                    <input type="text" className="form-control" id="floatingInput"></input>
                                    <label htmlFor="floatingInput">Item Name</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <textarea className="form-control" id="floatingInput" rows="3"></textarea>
                                    <label htmlFor="floatingInput">Description (Optional)</label>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                <option value="1">Food & Drink</option>
                                                <option value="2">Transport</option>
                                                <option value="3">Home Essentials</option>
                                            </select>
                                            <label htmlFor="floatingInput">Item Category</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating">
                                            <input type="number" className="form-control" id="floatingInput" min="1"></input>
                                            <label htmlFor="floatingInput">Item Price (Rp.)</label>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-add-item" title="Submit" style={{ bottom: "20px", right:"-30px"}} type="submit"><FontAwesomeIcon icon={faFloppyDisk} width="16px"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
