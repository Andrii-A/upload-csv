import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

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
  loading: boolean;
  noFileSelected: boolean;

  meta: fileType;
  tableHeader: string[];
  tableBody: any[];
  sortOrder: string;

  chartModel: any;

  constructor(private papa: Papa) {
  }

  fileChangeListener($event: any): void {
    this.chartModel = null;
    this.loading = true;
    this.noFileSelected = false;

    this.meta = $event.target.files[ 0 ];
    const files = $event.target.files;

    if (files !== null && files !== undefined && files.length > 0) {
      const reader: FileReader = new FileReader();
      reader.readAsText(files[ 0 ]);
      reader.onload = e => {
        this.loading = false;
        this.noFileSelected = false;
        const csv = reader.result;
        this.chartModel = csv;

        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.tableHeader = results.data[ 0 ];
          this.tableBody = [...results.data.slice(1, results.data.length)];
        } else {
          this.noFileSelected = false;
          this.chartModel = null;
          console.log('Errors Parsing CSV File >>>', results && results.errors ? results.errors : '');
        }
      };
    } else {
      this.loading = false;
      this.meta = undefined;
      this.tableHeader = undefined;
      this.tableBody = undefined;
      this.noFileSelected = true;
      this.chartModel = null;
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
}





