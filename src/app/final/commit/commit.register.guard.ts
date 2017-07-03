/**
 * Created by xuchao on 2017/6/27.
 */
import {Injectable} from '@angular/core';
import {RegisterGuard} from '../../framework/guard/register.guard';
@Injectable()
export class CommitRegisterGuard extends RegisterGuard {
  protected onCheckFail(fans: any) {
    console.log(fans);
  }
}
