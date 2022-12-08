import { useState, useEffect } from "react";

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faClose, faEllipsisVertical, faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Income() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Form input
    const [income_source, setIncomeName] = useState("");
    const [income_desc, setIncomeDesc] = useState("");
    const [income_category, setIncomeCategory] = useState("Main Job");
    const [income_price, setIncomePrice] = useState();

    var total = 0;
    var dateBefore = null;

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:3000/api/income/manage",
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

    async function addIncome(e) {
        //e.preventDefault();
        const postData = async () => {
            const income = {
                income_source: income_source,
                income_desc: income_desc,
                income_category: income_category,
                income_price: income_price
            };
        
            const response = await fetch("http://localhost:3000/api/income/manage", {
                method: "POST",
                body: JSON.stringify(income)
            });
            return response.json();
        };
        postData().then((income) => {
            alert(income.msg);
        });
    }

    //Datechip
    function dateChip(datetime){
        const result = new Date(datetime);
        const now = new Date(Date.now());
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if(result.toDateString() === now.toDateString()){
            return (<div className="datechip">Today</div>);
        } else if(result.toDateString() === yesterday.toDateString()){
            return (<div className="datechip">Yesterday</div>);
        } else {
            return (<div className="datechip">{result.getFullYear() + "/" + ("0" + (result.getMonth() + 1)).slice(-2) + "/" + ("0" + result.getDate()).slice(-2)}</div>);
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className="table-highlight">
                    <h6>Income</h6>
                    <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
                    <div className="income-item-holder">
                        {
                            
                            data.map((val, i, index) => {
                                const result = new Date(val.income_created_at);
                                const now = new Date(Date.now());
                                
                                if(result.toDateString() == now.toDateString()){
                                    total += val.income_price;
                                }

                                if(dateBefore == null || dateBefore != result.toDateString()){
                                    dateBefore = result.toDateString();

                                    return(
                                        <div key={i}>
                                            {dateChip(val.income_created_at)}
                                            <button className="income-box" style={{borderLeft:"4px  solid #292735"}}>
                                                <h6>{val.income_source}</h6>
                                                <p><span style={{fontWeight:"500"}}>{val.income_category}</span>, {val.income_desc}</p>
                                                <h6 className="income-price">Rp. {val.income_price}</h6>
                                            </button>
                                        </div>
                                    );
                                } else {
                                    return(
                                        <div key={i}>
                                            <button className="income-box" style={{borderLeft:"4px  solid #292735"}} key={i}>
                                                <h6>{val.income_source}</h6>
                                                <p><span style={{fontWeight:"500"}}>{val.income_category}</span>, {val.income_desc}</p>
                                                <h6 className="income-price">Rp. {val.income_price}</h6>
                                            </button>
                                        </div>
                                    );
                                }                            
                            })
                        }
                    </div>
                    <div className="result_income-box">
                        <a>Today</a>
                        <h6>Rp. {total}</h6>
                    </div>
                    <button className="btn btn-scroll-income" title="Back to the top" style={{ bottom: "180px"}}><FontAwesomeIcon icon={faChevronUp} width="18.5px"/></button>
                    <button className="btn btn-remove-item" title="Remove All income" style={{ bottom: "120px"}}><FontAwesomeIcon icon={faTrash} width="14.5px"/></button>
                    <button className="btn btn-add-item" title="Add income" style={{ bottom: "60px"}} data-bs-toggle="modal" data-bs-target="#addIncome"
                        ><FontAwesomeIcon icon={faPlus} width="14.5px"/></button>
                </div>
                <div className="modal fade" id="addIncome" tabIndex="-1" aria-labelledby="addIncomeLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button className="btn btn-close-modal" title="Close" data-bs-dismiss="modal"><FontAwesomeIcon icon={faClose} width="14.5px"/></button>
                                <h6>Add Income Item</h6>
                                <div className="form-floating mt-3">
                                    <input type="text" className="form-control" id="floatingInput" onChange={(e)=> setIncomeName(e.target.value)}></input>
                                    <label htmlFor="floatingInput">Item Source</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <textarea className="form-control" id="floatingInput" rows="3" onChange={(e)=> setIncomeDesc(e.target.value)}></textarea>
                                    <label htmlFor="floatingInput">Description (Optional)</label>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=> setIncomeCategory(e.target.value)}>
                                                <option value="Main Job">Main Job</option>
                                                <option value="Side Job">Side Job</option>
                                                <option value="Present">Present</option>
                                            </select>
                                            <label htmlFor="floatingInput">Item Category</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating">
                                            <input type="number" className="form-control" id="floatingInput" min="1" onChange={(e)=> setIncomePrice(e.target.value)}></input>
                                            <label htmlFor="floatingInput">Item Price (Rp.)</label>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-add-item" title="Submit" style={{ bottom: "20px", right:"-30px"}} onClick={(e) => addIncome()}><FontAwesomeIcon icon={faFloppyDisk} width="16px"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
