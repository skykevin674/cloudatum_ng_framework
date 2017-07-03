/**
 * Created by xuchao on 2017/6/28.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HttpVote} from '../../util/http/http.vote';
@Injectable()
export class DetailRankResolver implements Resolve<any> {
  constructor(private http: HttpVote) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.getRank(route.queryParams['activityId'], route.params['id']);
  }
}
