import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpBargain} from '../../util/http/http.bargain';
import {Observable} from 'rxjs/Observable';
import {SessionStorage} from 'ng2-webstorage';
/**
 * Created by xuchao on 2017/6/29.
 */
export class MyBargainResolver implements Resolve<any> {
  @SessionStorage('my')
  protected my: any;

  constructor(private http: HttpBargain) {

  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const productId = route.params['productId'];
    if (this.my && this.my.productId === productId) {
      return Observable.of({code: 0, body: this.my});
    }
    return this.http.search({
      productId: route.params['productId'],
      openid: route.queryParams['openid'] || route.queryParams['auth2Id'],
      isRank: false
    });
  }
}
