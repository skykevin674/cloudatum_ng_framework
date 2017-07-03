import {Http, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
/**
 * Created by xuchao on 2017/6/26.
 */
export class HttpHelper {
  public static request(http: Http, url: string, data: any, onFinal?: any, method?: RequestMethod): Observable<any> {
    let obv: Observable<any>;
    switch (method) {
      case RequestMethod.Post:
        obv = http.post(url, data);
        break;
      case RequestMethod.Get:
      default:
        obv = http.get(url, { params: data });
        break;
    }
    return obv.map((res: any) => res.json()).finally(onFinal);
  }
}
