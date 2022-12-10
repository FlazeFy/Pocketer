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
    var spend = 0;
    var spendDate;

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

    function countProfit(spend, income){
        var result = income - spend;
        if(result > 0){
            return (
                <h5 className='box-main-text' style={{color:"#00BB8C"}}>+ Rp. {result}</h5>
            );
        } else {
            return (
                <h5 className='box-main-text' style={{color:"#FF5691"}}>- Rp. {result}</h5>
            );
        }
    }

    function dateConvert(datetime){
        const result = new Date(datetime);
        const month = result.toLocaleString('default', { month: 'short' }); 
        const now = new Date(Date.now());
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if(result.toDateString() === now.toDateString()){
            return "Today";
        } else if(result.toDateString() === yesterday.toDateString()){
            return "Yesterday";
        } else {
            return ("0" + result.getDate()).slice(-2) + " " + month + " " + result.getFullYear();
        }
    }

    //Date convert for profit. Between spending and income
    function dateConvertProfit(spend_d, income_d){
        if(spend_d > income_d){
            return dateConvert(spend_d);
        } else {
            return dateConvert(income_d);
        }
    }

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
                        spend = val.total;
                        spendDate = val.lastdate;

                        return(
                            <div className="box-highlight" key={i}>
                                <h6><FontAwesomeIcon icon={faDollar} width="13px"/> &nbsp;&nbsp;Spending</h6>
                                <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                <h5 className="box-main-text">Rp. {val.total}</h5>
                                <h6 className="box-secondary-text">Last Updated: {dateConvert(val.lastdate)}</h6>
                                <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                            </div>
                        );
                    } else if(i == 1){
                        return(
                            <div key={i}>
                                <div className="box-highlight">
                                    <h6><FontAwesomeIcon icon={faMoneyBillTrendUp} width="18px"/> &nbsp;&nbsp;Income</h6>
                                    <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                    <h5 className="box-main-text">Rp. {val.total}</h5>
                                    <h6 className="box-secondary-text">Last Updated: {dateConvert(val.lastdate)}</h6>
                                    <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                                </div>
                                <div className="box-highlight">
                                    <h6><FontAwesomeIcon icon={faChartLine} width="18px"/> &nbsp;&nbsp;Profit</h6>
                                    <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                                    {countProfit(spend, val.total)}
                                    <h6 className="box-secondary-text">Last Updated: {dateConvertProfit(spendDate, val.lastdate)}</h6>
                                    <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
                                </div>
                            </div>
                        );
                    } 
                })
            }
        </>
    )
}
