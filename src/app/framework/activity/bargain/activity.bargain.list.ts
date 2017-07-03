import {BargainBaseComponent} from './activity.bargain.base';
import {LoaderService} from '../../widget/loader/loader.service';
import {WxApi} from '../../util/common/wx.api';
import {HttpBargain} from '../../util/http/http.bargain';
import {ActivatedRoute} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
/**
 * Created by xuchao on 2017/6/30.
 */
declare const json;
export class BargainListBase extends BargainBaseComponent {
  protected array: any[] = json.products.body;
  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected http: HttpBargain, protected wx: WxApi, protected loader: LoaderService) {
    super(storage, route, http, wx, loader);
  }
}
