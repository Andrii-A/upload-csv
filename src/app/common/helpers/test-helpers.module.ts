import { Pipe, PipeTransform, NgModule, Component, Input } from '@angular/core';

// ------------ MOCK PIPES
@Pipe({
  name: 'filesize'
})
export class MockFilesizePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}



// ------------ MOCK COMPONENTS

@Component({
  selector: 'app-chart',
  template: '<p>Mock ChartComponent</p>'
})
export class MockChartComponent {
  @Input() model;
}






const allDeps = [
  MockFilesizePipe,
  MockChartComponent,
];


@NgModule({
  declarations: allDeps,
  exports: allDeps
})
export class TestHelperModule {
}
