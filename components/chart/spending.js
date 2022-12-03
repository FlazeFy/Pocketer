
import React, { Component } from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"


class SpendingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Nov 29", "Nov 30", "Nov 31", "Des 1", "Des 2", "Des 3", "Today"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70]
        }
      ]
    };
  }

  render() {
    return (
        <div className="chart-highlight">
            <h6>Total Spending</h6>
            <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
            <div className="SpendingChart me-4">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
        </div>
    );
  }
}

export default SpendingChart;