import { useState, useEffect } from "react";
import React from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"


export default function IncomeLineChart() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var seriesData = [];
    var chart = [];

    //Converter
    const data = Object.values(items);
        
    //Get last 7 days 
    var days = ["Today"];
    for(var i = 1; i < 7; i++){
        const now = new Date();
        now.setDate(now.getDate() - i);
        const month = now.toLocaleString('default', { month: 'short' });
        // console.log(month + " " + ("0" + now.getDate()).slice(-2));
        days.push(month + " " + ("0" + now.getDate()).slice(-2));
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/income/weekly")
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

    function getSeries(day, val){
        day.forEach(e1 => { //Last 7 days
        var check = false;
        val.forEach(e2 => { //Total per days
            const day2 = new Date(e2.date);
            const month = day2.toLocaleString('default', { month: 'short' }); 

            //Same day validator  
            if(e1 == month + " " + ("0" + day2.getDate()).slice(-2)){
            seriesData.push(e2.total);
            check = true;
            }
        });

        if(check == false){
            seriesData.push("0");
        }
        });
        // console.log(seriesData);
        return seriesData;
    }

    chart = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: days.reverse()
            }
            },
            series: [
            {
                data: getSeries(days, data)
            }
        ]
    };

    return (
        <div className="chart-highlight">
        <h6>Total Income</h6>
        <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
        <div className="SpendingChart me-4">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="line"
                    />
                </div>
            </div>
        </div>
        <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
        </div>
    );
}