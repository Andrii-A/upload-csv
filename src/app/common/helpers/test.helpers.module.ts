import { Pipe, PipeTransform, NgModule } from '@angular/core';

// ------------ MOCK PIPES
@Pipe({
  name: 'filesize'
})
export class MockFilesizePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}





const allDeps = [
  MockFilesizePipe,
];


@NgModule({
  declarations: allDeps,
  exports: allDeps
})
export class TestHelperModule {
}
