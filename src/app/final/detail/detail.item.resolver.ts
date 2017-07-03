/**
 * Created by xuchao on 2017/6/27.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionStorage} from 'ng2-webstorage';
import {HttpVote} from '../../framework/util/http/http.vote';
@Injectable()
export class DetailItemResolver implements Resolve<any> {
  @SessionStorage('item')
  private item: any;

  constructor(protected http: HttpVote) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (route.params['id'] === this.item.id) {
      return Observable.of({code: 0, body: [this.item]});
    }
    return this.http.search({activityId: route.queryParams['activityId'], id: route.params['id']});
  }
}
