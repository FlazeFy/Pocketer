
import React from "react";
import { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"


export default function SpendingChart() {
  //Initial variable
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  var seriesData = [];
  var chart = [];

  //Converter
  const data = Object.values(items);

  useEffect(() => {
    fetch("http://localhost:3000/api/spending/category")
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

  function getSeries(val){
    var catSeries = [];
    val.forEach(e => { 
      catSeries.push(parseInt(e.total));
    });
    return catSeries;
  }

  function getCategory(val){
    var catData = [];
    val.forEach(e => { 
      catData.push(e.purchased_category);
    });
    return catData;
  }

  chart = {
    series: getSeries(data),
    options: {
      labels: getCategory(data)
    }
  };

  return (
    <div className="chart-highlight">
      <h6>Spending by Category</h6>
      <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
      <div className="SpendingChart me-4">
          <div className="row">
              <div className="mixed-chart">
                  <Chart
                    options={chart.options}
                    series={chart.series}
                    type="donut"
                  />
              </div>
          </div>
      </div>
      <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
    </div>
  ); 
}