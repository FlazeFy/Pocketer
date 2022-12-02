//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Purchased() {
    return (
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
            <button className="btn btn-transparent btn-remove-item" title="Remove All purchase" style={{ bottom: "120px"}}><FontAwesomeIcon icon={faTrash} width="14.5px"/></button>
            <button className="btn btn-transparent btn-add-item" title="Add purchase" style={{ bottom: "60px"}}><FontAwesomeIcon icon={faPlus} width="14.5px"/></button>
        </div>
    )
}
