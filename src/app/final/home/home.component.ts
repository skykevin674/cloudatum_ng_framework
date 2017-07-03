/**
 * Created by xuchao on 2017/6/27.
 */
import {Component, OnInit} from '@angular/core';
import {VoteHomeBaseComponent} from '../../framework/activity/vote/activity.vote.home';
import {CheckDate, NeedFollow} from '../../framework/activity/method.guard';
import {HttpVote} from '../../framework/util/http/http.vote';
import {LoaderService} from '../../framework/widget/loader/loader.service';
import {ToastService} from '../../framework/widget/toaster/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
import {WxApi} from '../../framework/util/common/wx.api';
declare let json;
@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent extends VoteHomeBaseComponent implements OnInit {

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected toast: ToastService, protected loader: LoaderService,
              protected http: HttpVote, protected router: Router, protected wx: WxApi) {
    super(storage, route, toast, loader, http, wx);
  }

  public ngOnInit() {
    this.navigateToShare();
    super.ngOnInit();
  }

  @CheckDate('onOutDate')
  @NeedFollow('onNotFollow')
  public vote(item: any) {
    super.vote(item);
  }

  public onOutDate() {
    this.toast.info('不在活动期内');
  }

  public onNotFollow() {
    this.toast.info('未关注');
  }

  protected onVoteSuccess(item: any) {
    this.toast.info('投票成功 ');
    super.onVoteSuccess(item);
  }

  protected onVoteFail(item: any, resp: any) {
    this.toast.info(resp.msg);
  }

  protected onSearchSuccess(item: any) {
    this.storage.store('item', item);
    this.router.navigate(['/detail', item.id], {queryParamsHandling: 'preserve'});
  }

  private navigateToShare() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.storage.store('item', json.item);
      this.router.navigate(['/detail', id], {queryParamsHandling: 'preserve'});
    }
  }
}
