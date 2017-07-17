/**
 * Created by xuchao on 2017/6/30.
 */
import {Component, OnInit} from '@angular/core';
import {BargainListBase} from '../../../framework/activity/bargain/activity.bargain.list';
import {LoaderService} from '../../../framework/widget/loader/loader.service';
import {WxApi} from '../../../framework/util/common/wx.api';
import {HttpBargain} from '../../../framework/util/http/http.bargain';
import {SessionStorageService} from 'ng2-webstorage';
import {ActivatedRoute, Router} from '@angular/router';
import {NeedFollow} from '../../../framework/activity/method.guard';

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers: [HttpBargain, WxApi]
})
export class ListComponent extends BargainListBase implements OnInit {
  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected http: HttpBargain, protected wx: WxApi, protected loader: LoaderService,
              protected router: Router) {
    super(storage, route, http, wx, loader);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  @NeedFollow('onNotFollow')
  protected join(product: any, direct: boolean) {
    super.join(product, direct);
  }

  protected navigateToJoin(product: any) {
    this.storage.store('product', product);
    this.router.navigate(['/join', product.id], {queryParamsHandling: 'preserve'});
  }
}
