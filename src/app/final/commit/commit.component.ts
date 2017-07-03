/**
 * Created by xuchao on 2017/6/27.
 */
import {Component} from '@angular/core';
import {VoteCommitBaseComponent} from '../../framework/activity/vote/activity.vote.commit';
import {HttpVote} from '../../framework/util/http/http.vote';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
import {LoaderService} from '../../framework/widget/loader/loader.service';
import {ToastService} from '../../framework/widget/toaster/toast.service';
import {WxApi} from '../../framework/util/common/wx.api';
import {isBoolean} from 'util';
import {Validator} from '../../framework/util/common/validation';
@Component({
  templateUrl: 'commit.component.html',
  styleUrls: ['commit.component.css'],
  providers: [HttpVote, Validator]
})
export class CommitComponent extends VoteCommitBaseComponent {
  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected toast: ToastService, protected loader: LoaderService, protected http: HttpVote,
              protected wx: WxApi, protected validator: Validator, protected router: Router) {
    super(storage, route, toast, loader, http, wx);
  }

  protected check(): boolean {
    if (!this.name) {
      this.toast.info('请输入姓名');
      return false;
    }
    if (!this.validator.isMobileValid(this.mobile)) {
      this.toast.info('请输入合法手机号');
      return false;
    }
    return true;
  }

  protected onJoinSuccess(item: any) {
    super.onJoinSuccess(item);
    this.router.navigate(['/home'], {queryParamsHandling: 'preserve'});
  }
}
