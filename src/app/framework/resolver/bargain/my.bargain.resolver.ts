import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpBargain} from '../../util/http/http.bargain';
import {Observable} from 'rxjs/Observable';
/**
 * Created by xuchao on 2017/6/29.
 */
export class MyBargainResolver implements Resolve<any> {
  constructor(private http: HttpBargain) {

  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.search({
      productId: route.params['id'], openid: route.queryParams['openid'] || route.queryParams['auth2Id'], isRank: false
    });
  }
}
