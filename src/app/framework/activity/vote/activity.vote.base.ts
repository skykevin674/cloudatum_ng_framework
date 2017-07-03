import {ActivityComponent} from '../activity.component';
import {OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionStorage, SessionStorageService} from 'ng2-webstorage';
import {ToastService} from '../../widget/toaster/toast.service';
import {LoaderService} from '../../widget/loader/loader.service';
import {HttpVote} from '../../util/http/http.vote';
import {CheckDate, NeedFollow, NeedRegister} from '../method.guard';
import {WxApi} from '../../util/common/wx.api';
/**
 * Created by xuchao on 2017/6/23.
 */
declare let json;
export class VoteBaseComponent extends ActivityComponent implements OnInit {

  protected array: any[];
  protected loading: boolean = false;
  protected end: boolean = false;

  protected activityId: string;
  protected pageSize: number = 10;
  protected pageNum: number = 1;
  protected currentState: string = 'currentCount';

  protected number: number;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected toast: ToastService, protected loader: LoaderService, protected http: HttpVote,
              protected wx: WxApi) {
    super(storage, route, wx);
  }

  public reload(state: string) {
    if (!this.loading) {
      this.currentState = state;
      this.pageNum = 1;
      this.end = false;
      this.array = [];
      this.load();
    }
  }

  public load() {
    if (!this.loading && !this.end) {
      this.loading = true;
      this.http.load({
        activityId: this.activityId, pageNum: this.pageNum, pageSize: this.pageSize,
        orderBy: this.currentState, orderType: 'desc'
      }, () => this.loading = false).subscribe((resp: any) => {
        if (resp.code === 0) {
          if (!this.array) {
            this.array = [];
          }
          this.array = this.array.concat(resp.body);
          if (resp.body.length < this.pageSize) {
            this.end = false;
          }
        }
      });
    }

  }

  public vote(item: any) {
    if (json.my && json.my.id === item.id) {
      this.toast.info('不能给自己投票');
      return;
    }
    this.loader.popLoader('正在投票');
    this.http.vote({
      activityId: this.activityId, itemId: item.id, openid: json.fans.body.openId,
      nickname: json.fans.body.nickname, voteType: 1, targetNickname: item.nickname,
      selfItemId: (json.my ? json.my.id : null)
    }, () => this.loader.dismissLoader()).subscribe((resp: any) => {
      if (resp.code === 0) {
        this.onVoteSuccess(item);
      } else {
        this.onVoteFail(item, resp);
      }
    });
  }

  public search(num: number, needNotify: boolean) {
    if (num) {
      if (needNotify) {
        this.loader.popLoader('正在搜索');
      }
      this.http.search({activityId: this.activityId, number: num}, () => {
        if (needNotify) {
          this.loader.dismissLoader();
        }
      }).subscribe((resp: any) => {
        if (resp.code === 0 && resp.body && resp.body.length > 0) {
          this.onSearchSuccess(resp.body[0]);
        } else {
          if (needNotify) {
            this.toast.info('未搜索到');
          }
        }
      });
    } else {
      this.toast.info('请输入编号');
    }
  }

  public ngOnInit() {
    super.ngOnInit();
    this.activityId = this.route.snapshot.queryParams['activityId'];
    console.log(json);
  }

  protected onSearchSuccess(item: any) {
    console.log(item);
  }

  protected onVoteSuccess(item: any) {
    json.info.body.voteCount++;
    for (let i of this.array) {
      if (i.id === item.id) {
        i.currentCount++;
        break;
      }
    }
  }

  protected onVoteFail(item: any, resp: any) {
    console.log(item);
  }
}
