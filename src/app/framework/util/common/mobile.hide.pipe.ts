/**
 * Created by xuchao on 2017/6/22.
 */
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'mobile'})
export class MobileHidePipe implements PipeTransform {
  public transform(mobile: string): string {
    if (mobile) {
      return mobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
    }
    return '';
  }
}
