/**
 * Created by xuchao on 2017/6/27.
 */
import {Injectable} from '@angular/core';
import {FollowGuard} from '../../framework/guard/follow.guard';
import {ToastService} from '../../framework/widget/toaster/toast.service';
@Injectable()
export class CommitFollowGuard extends FollowGuard {

  constructor(protected toast: ToastService) {
    super();
  }

  protected onCheckFail() {
    this.toast.info('未关注');
  }
}
