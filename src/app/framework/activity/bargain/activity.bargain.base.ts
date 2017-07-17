import {ActivityComponent} from '../activity.component';
import {HttpVote} from '../../util/http/http.vote';
import {ActivatedRoute} from '@angular/router';
import {SessionStorage, SessionStorageService} from 'ng2-webstorage';
import {WxApi} from '../../util/common/wx.api';
import {OnInit} from '@angular/core';
import {LoaderService} from '../../widget/loader/loader.service';
import {HttpBargain} from '../../util/http/http.bargain';
/**
 * Created by xuchao on 2017/6/30.
 */
declare const json;
export class BargainBaseComponent extends ActivityComponent implements OnInit {
  protected activityId: string;
  protected mobile: string;
  protected name: string;

  @SessionStorage('my')
  protected my: any;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected http: HttpBargain, protected wx: WxApi, protected loader: LoaderService) {
    super(storage, route, wx);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.activityId = this.route.snapshot.queryParams['activityId'];
    if (json.fans.code === 0) {
      this.mobile = json.fans.body.phoneNum;
      this.name = json.fans.body.nickname;
    }
  }

  protected navigateToJoin(product: any) {
    console.log('navigate to join');
  }

  protected navigateToDetail(my: any, product: any) {
    console.log(my);
  }

  protected checkProductJoinDate(product: any): boolean {
    const now = new Date().getTime();
    if (now < product.startTime) {
      this.notInPeriod(true);
      return false;
    } else if (now > product.endTime) {
      this.notInPeriod(false);
      return false;
    }
    return true;
  }

  protected join(product: any, direct: boolean) {
    if (!this.checkProductJoinDate(product)) {
      return;
    }
    if (this.my && this.my.code === 0) {
      this.navigateToDetail(this.my.body, product);
      return;
    }
    this.http.search({productId: product.id, openid: this.openid}, () => {
      this.loader.dismissLoader();
    }).subscribe((my: any) => {
      if (my.code === 0) {
        this.navigateToDetail(my.body, product);
      } else {
        if (!direct) {
          this.navigateToJoin(product);
        } else {
          this.loader.popLoader('正在参与');
          this.http.join({
            openid: this.openid, activityId: this.activityId,
            productId: product.id, name: this.name, mobile: this.mobile
          }, () => {
            this.loader.dismissLoader();
          }).subscribe((data: any) => {
            if (data.code === 0) {
              this.onJoinSuccess(data);
            } else {
              this.onJoinFail(data);
            }
          });
        }
      }
    });
  }

  protected bargain(target: any) {
    this.loader.popLoader('正在砍价');
    this.http.bargain({
      openid: json.fans.body.openId, originalId: this.originalId, mobile: json.fans.body.phoneNum,
      nickname: json.fans.body.nickname, headimgurl: json.fans.body.headImgUrl, personId: target.id,
      productId: target.productId
    }, () => {
      this.loader.dismissLoader();
    }).subscribe((data: any) => {
      if (data.code === 0) {
        this.onBargainSuccess(data);
      } else {
        this.onBargainFail(data);
      }
    });
  }

  protected notInPeriod(isBefore: boolean) {
    console.log('不在活动期');
  }

  protected onJoinSuccess(resp: any) {
    console.log(resp);
  }

  protected onJoinFail(resp: any) {
    console.log(resp);
  }

  protected onBargainSuccess(resp: any) {
    console.log(resp);
  }

  protected onBargainFail(resp: any) {
    console.log(resp);
  }
}
