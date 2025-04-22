import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
  standalone: false
})
export class CnpjPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';

    const cnpj = value.toString().padStart(14, '0').replace(/\D/g, '');

    if (cnpj.length !== 14) return value.toString();

    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}`;
  }

}
