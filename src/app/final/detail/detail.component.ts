/**
 * Created by xuchao on 2017/6/27.
 */
import {Component, OnInit} from '@angular/core';
import {VoteBaseComponent} from '../../framework/activity/vote/activity.vote.base';
import {HttpVote} from '../../framework/util/http/http.vote';
import {LoaderService} from '../../framework/widget/loader/loader.service';
import {ToastService} from '../../framework/widget/toaster/toast.service';
import {ActivatedRoute} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
import {CheckDate, NeedFollow} from '../../framework/activity/method.guard';
import {WxApi} from '../../framework/util/common/wx.api';
@Component({
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent extends VoteBaseComponent implements OnInit {
  private item: any;
  private rank: number;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected toast: ToastService, protected loader: LoaderService, protected http: HttpVote,
              protected wx: WxApi) {
    super(storage, route, toast, loader, http, wx);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.route.data.forEach((data: { item: any, rank: any }) => {
      if (data.item.code === 0 && data.item.body.length > 0) {
        this.item = data.item.body[0];
      }
      if (data.rank.code === 0) {
        this.rank = data.rank.msg;
      }
    });

    this.wx.configShare('测试', '测试',
      `${location.origin}/vote${location.pathname}?originalid=${this.originalId}&activityId=${this.activityId}&scope=snsapi_userinfo&id=${this.item.id}`, '');
  }

  @CheckDate('onOutDate')
  @NeedFollow('onNotFollow')
  public vote(item: any) {
    super.vote(item);
  }
}
