
import React, { Component } from "react";
import Chart from "react-apexcharts";
//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"


class CategoryChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    }
  }

  render() {
    return (
        <div className="chart-highlight">
          <h6>Spending by Category</h6>
          <button className="btn btn-transparent box-setting" title="Setting"><FontAwesomeIcon icon={faEllipsisVertical} width="4.5px"/></button>
          <div className="SpendingChart me-4">
              <div className="row">
                  <div className="mixed-chart">
                      <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="donut"/>
                  </div>
              </div>
          </div>
          <button className="btn btn-outline-more box-more" title="See more"><FontAwesomeIcon icon={faChevronRight} width="14px"/></button>
        </div>
    );
  }
}

export default CategoryChart;