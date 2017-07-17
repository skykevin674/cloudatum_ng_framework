import {BargainBaseComponent} from './activity.bargain.base';
import {LoaderService} from '../../widget/loader/loader.service';
import {WxApi} from '../../util/common/wx.api';
import {HttpBargain} from '../../util/http/http.bargain';
import {ActivatedRoute} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
import {Observable} from 'rxjs/Observable';
/**
 * Created by xuchao on 2017/6/30.
 */
declare const json;
export class BargainListBase extends BargainBaseComponent {
  protected array: any[] = json.products.body;
  protected page: number = 1;
  protected size: number = 30;
  protected loading: boolean = false;
  protected end: boolean = false;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected http: HttpBargain, protected wx: WxApi, protected loader: LoaderService) {
    super(storage, route, http, wx, loader);
  }

  public load() {
    if (!this.loading && !this.end) {
      this.loading = true;
      this.http.getRank({
          activityId: +this.activityId,
          productId: this.route.snapshot.params['productId'],
          pageNum: this.page, pageSize: this.size
        },
        () => {
          this.loading = false;
        }).subscribe((data: any) => {
        if (data.code === 0) {
          this.page++;
          this.array = this.array.concat(data.body);
          if (data.body.length < this.size) {
            this.end = true;
          }
        }
      });
    }
  }

  protected bindScroller(scroller: HTMLElement) {
    Observable.fromEvent(scroller, 'scroll').subscribe(() => {
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 10) {
        this.load();
      }
    });
  }
}
