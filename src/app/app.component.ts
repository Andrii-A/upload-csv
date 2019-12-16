import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import * as d3 from 'd3';

export type fileType = {
  lastModifiedDate: Date,
  name: string,
  size: number,
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isValid: boolean;
  loading: boolean;
  noFileSelected: boolean;
  showMainLabel: boolean;

  meta: fileType;
  tableHeader: string[];
  tableBody: any[];
  sortOrder: string;

  constructor(private papa: Papa) {
  }

  fileChangeListener($event: any): void {
    this.meta = $event.target.files[ 0 ];

    const files = $event.target.files;
    this.loading = true;
    this.noFileSelected = false;
    if (files !== null && files !== undefined && files.length > 0) {
      const reader: FileReader = new FileReader();
      reader.readAsText(files[ 0 ]);
      reader.onload = e => {
        this.loading = false;
        this.noFileSelected = false;

        const csv = reader.result;
        this.buildChart(csv);


        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isValid = true;
          this.tableHeader = results.data[ 0 ];
          this.tableBody = [...results.data.slice(1, results.data.length)];
        } else {
          this.isValid = false;
          this.noFileSelected = false;
          this.showMainLabel = false;
          d3.selectAll('svg').remove();
          console.log('Errors Parsing CSV File >>>', results.errors);
        }
      };
    } else {
      this.loading = false;
      this.meta = undefined;
      this.tableHeader = undefined;
      this.tableBody = undefined;

      this.isValid = false;
      this.noFileSelected = true;
      this.showMainLabel = false;
      d3.selectAll('svg').remove();
    }
  }

  toggleSortOrder() {
    if (this.sortOrder === '' || this.sortOrder === 'ASC') {
      this.sortOrder = 'DESC';
      this.tableBody.sort((a, b) => b[ 2 ] - a[ 2 ]);
    } else {
      this.sortOrder = 'ASC';
      this.tableBody.sort((a, b) => a[ 2 ] - b[ 2 ]);
    }
  }




  buildChart(csv) {
    // Parse the Data
    const rowData = d3.csvParse(csv);

    const unsortedData = rowData.map((row: any) => {
      return {
        value: row[ 'Issue count' ],
        year: this.mapDate(row[ 'Date of birth' ]),
        sortingIndex: Date.parse(row[ 'Date of birth' ]),
      };
    });

    const data = Object.assign([], unsortedData.sort((a, b) => a.sortingIndex - b.sortingIndex));

// clear div before building new chart
    d3.selectAll('svg').remove();
    this.showMainLabel = false;


// set the dimensions and margins of the graph
    const columnWidth = 7;
    const margin = { top: 30, right: 0, bottom: 70, left: 20 };
    const width = data.length * columnWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    const svg = d3.select('#my_dataviz')
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

    this.showMainLabel = true;
  }


  mapDate(DateString){
    const d = new Date(DateString);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };


}





