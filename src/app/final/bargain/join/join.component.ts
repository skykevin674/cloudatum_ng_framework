/**
 * Created by xuchao on 2017/7/3.
 */
import {Component} from '@angular/core';
import {BargainBaseComponent} from '../../../framework/activity/bargain/activity.bargain.base';
import {LoaderService} from '../../../framework/widget/loader/loader.service';
import {WxApi} from '../../../framework/util/common/wx.api';
import {HttpBargain} from '../../../framework/util/http/http.bargain';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorage, SessionStorageService} from 'ng2-webstorage';
declare let json;
@Component({
  templateUrl: 'join.component.html',
  styleUrls: ['join.component.css'],
  providers: [HttpBargain]
})
export class JoinComponent extends BargainBaseComponent {
  @SessionStorage('product')
  protected product: any;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected http: HttpBargain, protected wx: WxApi, protected loader: LoaderService,
              protected router: Router) {
    super(storage, route, http, wx, loader);
  }

  protected onBargainSuccess(resp: any) {
    json.my = resp;
    this.router.navigate(['/list'], {queryParamsHandling: 'preserve'});
  }

  protected onBargainFail(resp: any) {
    console.log(resp.msg);
  }
}
