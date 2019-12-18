import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { mapDate } from '../common/helpers/helpers';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() model: any;
  constructor() { }

  ngOnInit() {
    this.buildChart(this.model);
  }



  buildChart(csv) {
    // Parse the Data
    const rowData = d3.csvParse(csv);

    const unsortedData = rowData.map((row: any) => {
      return {
        value: row[ 'Issue count' ],
        year: mapDate(row[ 'Date of birth' ]),
        sortingIndex: Date.parse(row[ 'Date of birth' ]),
      };
    });

    const data = Object.assign([], unsortedData.sort((a, b) => a.sortingIndex - b.sortingIndex));

// clear div before building new chart
    d3.selectAll('svg').remove();

// set the dimensions and margins of the graph
    const columnWidth = data.length < 50 ? 20 : 7;
    const margin = { top: 30, right: 0, bottom: 70, left: 20 };
    const width = data.length * columnWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');


// X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.year))
      .padding(0.2);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

// Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

// Bars
    svg.selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => {
        return x(d.year);
      })
      .attr('y', (d) => {
        return y(d.value);
      })
      .attr('width', x.bandwidth())
      .attr('height', (d) => {
        return height - y(d.value);
      })
      .attr('fill', '#dde2e6');
  }

}
