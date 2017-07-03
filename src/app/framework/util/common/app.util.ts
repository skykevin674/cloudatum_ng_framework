/**
 * Created by xuchao on 2017/6/22.
 */
import {Injectable} from '@angular/core';
@Injectable()
export class AppUtil {

  public cache: any = {};

  public queryParam(params: string): any {
    if (this.cache[params]) {
      return this.cache[params];
    }
    const url = window.location.href;
    const paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
    const paraObj = {};
    for (let i = 0, j; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
    }
    const returnValue = paraObj[params.toLowerCase()];
    if (typeof(returnValue) == 'undefined') {
      return '';
    } else {
      const value = returnValue.split('#')[0];
      this.cache[params] = value;
      return value;
    }
  }
}
