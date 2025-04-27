import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfOuCnpj'
})
export class CpfOuCnpjPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    if(value.length == 11) {

      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      
    } else if(value.length == 14) {
      
      return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
    }
    
    return value;
  }

}
