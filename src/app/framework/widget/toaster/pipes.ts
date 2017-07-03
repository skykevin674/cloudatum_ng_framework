/**
 * Created by xuchao on 2016/10/9.
 */
import {PipeTransform, Pipe} from '@angular/core';
import {ToastType} from './toast.model';
@Pipe({name: 'type2Bg'})
export class TypeToBackground implements PipeTransform {
  public transform(num: number): string {
    return '#' + num.toString(16);
  }
}

@Pipe({name: 'typeToFontColor'})
export class TypeToFontColor implements PipeTransform {
  public transform(type: number): string {
    switch (type) {
      case ToastType.FAIL:
        return '#fff';
      default:
        return '#333';
    }
  }
}
