/**
 * Created by xuchao on 2017/6/22.
 */
import {Injectable} from '@angular/core';
@Injectable()
export class Validator {
  public isMobileValid(mobile: string): boolean {
    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
  }
}
