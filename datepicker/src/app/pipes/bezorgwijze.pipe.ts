import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'bezorgwijze'})
export class BezorgwijzePipe implements PipeTransform {
  transform(word: string): string {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
