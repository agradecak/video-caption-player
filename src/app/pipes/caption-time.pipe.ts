import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'captionTime'
})
export class CaptionTimePipe implements PipeTransform {

  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

}
