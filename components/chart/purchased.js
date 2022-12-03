//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faEllipsisVertical, faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Purchased() {
    return (
        <>
            <div className="table-highlight">
                <h6>Purchased</h6>
                <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                <div className="purchased-item-holder">
                    <div className="datechip">Today</div>
                    <div className="purchased-box" style={{borderLeft:"4px  solid #292735"}}>
                        <h6>Mie goreng</h6>
                        <p>tes</p>
                        <h6 className="purchased-price">Rp. 8.000</h6>
                    </div>
                    <div className="purchased-box" style={{borderLeft:"4px  solid #292735"}}>
                        <h6>Mie goreng</h6>
                        <p>tes</p>
                        <h6 className="purchased-price">Rp. 8.000</h6>
                    </div>
                    <div className="purchased-box" style={{borderLeft:"4px  solid #292735"}}>
                        <h6>Mie goreng</h6>
                        <p>tes</p>
                        <h6 className="purchased-price">Rp. 8.000</h6>
                    </div>
                </div>
                <div className="result_purchased-box">
                    <a>Today</a>
                    <h6>Rp. 24.000</h6>
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
                                <label for="floatingInput">Item Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <textarea className="form-control" id="floatingInput" rows="3"></textarea>
                                <label for="floatingInput">Description (Optional)</label>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option value="1">Food & Drink</option>
                                            <option value="2">Transport</option>
                                            <option value="3">Home Essentials</option>
                                        </select>
                                        <label for="floatingInput">Item Price</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="floatingInput" min="1"></input>
                                        <label for="floatingInput">Item Price (Rp.)</label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-add-item" title="Submit" style={{ bottom: "20px", right:"-30px"}} type="submit"><FontAwesomeIcon icon={faFloppyDisk} width="16px"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
