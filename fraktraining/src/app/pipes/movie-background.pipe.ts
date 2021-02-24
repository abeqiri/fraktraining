import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieBackground'
})
export class MovieBackgroundPipe implements PipeTransform {
  transform(movieName: string): string {
    switch(movieName) {
      case 'Persona':
      case 'Breathless':
      case 'Taxi Driver':
        return 'yellow';
      default:
        return '';
    }
  }
}
