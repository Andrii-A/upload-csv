import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {
  transform(size: number) {
    return (size / (1024)).toFixed(2) + 'kb';
  }
}
