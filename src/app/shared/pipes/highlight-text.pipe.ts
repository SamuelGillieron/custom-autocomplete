import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText',
  standalone: true
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!args) return value;
    if (typeof value === 'string' || value instanceof String){
      const search = (args as any)
      const re =  new RegExp(search, 'igm');

      value= value.replace(re, '<span class="highlighted-text">$&</span>');
    }

    return value;
  }

}
