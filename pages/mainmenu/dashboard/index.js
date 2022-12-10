import { useState, useEffect } from "react";

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChevronRight, faDollar, faEllipsisVertical, faMoneyBillTrendUp, faSackDollar } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Highlight() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:3000/api/total")
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
        <>
            <div className="box-highlight">
                <h6><FontAwesomeIcon icon={faSackDollar} width="18px"/> &nbsp;&nbsp;Ballance</h6>
                <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                <h5 className="box-main-text">Rp. 39.000.000</h5>
                <h6 className="box-secondary-text">Last Updated: 28 Nov 22</h6>
                <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
            </div>
            {
                data.map((val, i, index) => {
                    if(i == 0){
                        return(
                            <div className="box-highlight" key={i}>
                                <h6><FontAwesomeIcon icon={faDollar} width="13px"/> &nbsp;&nbsp;Spending</h6>
                                <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                <h5 className="box-main-text">Rp. {val.total}</h5>
                                <h6 className="box-secondary-text">Last Updated: 28 Nov 22</h6>
                                <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                            </div>
                        );
                    } else if(i == 1){
                        return(
                            <div className="box-highlight">
                                <h6><FontAwesomeIcon icon={faMoneyBillTrendUp} width="18px"/> &nbsp;&nbsp;Income</h6>
                                <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                <h5 className="box-main-text">Rp. {val.total}</h5>
                                <h6 className="box-secondary-text">Last Updated: 28 Nov 22</h6>
                                <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                            </div>
                        );
                    }
                })
            }
            <div className="box-highlight">
                <h6><FontAwesomeIcon icon={faChartLine} width="18px"/> &nbsp;&nbsp;Profit</h6>
                <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                <h5 className="box-main-text">Rp. 3.260.000</h5>
                <h6 className="box-secondary-text">Last Updated: 28 Nov 22</h6>
                <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
            </div>
        </>
    )
}
