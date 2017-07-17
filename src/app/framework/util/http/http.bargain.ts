/**
 * Created by xuchao on 2017/6/26.
 */
import {Injectable} from '@angular/core';
import {EndPoint, Request} from './http.decorators';
import {Http, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpHelper} from './http.helper';
@Injectable()
export class HttpBargain {
  private endPoint: string = 'http://activity.wechat.cloudatum.com/';

  constructor(public http: Http) {
  }

  /**
   * @param data  {productId, openid, isRank, number}
   * @param onFinal
   * @returns {Observable<any>}
   */
  public search(data: any, onFinal?: any): Observable<any> {
    return HttpHelper.request(this.http, `${this.endPoint}activity/bargain/personInfo`,
      data, onFinal);
  }

  /**
   * @param data {personId}
   * @param onFinal
   */
  public getDetail(data: any, onFinal?: any): Observable<any> {
    return HttpHelper.request(this.http, `${this.endPoint}activity/bargain/bargainDetail`,
      data, onFinal, RequestMethod.Post);
  }

  /**
   * @param data {nickname, headimgurl, personId, productId, mobile, originalId, openid}
   * @param onFinal
   * @returns {Observable<any>}
   */
  public bargain(data: any, onFinal?: any): Observable<any> {
    return HttpHelper.request(this.http, `${this.endPoint}activity/bargain/bargain`,
      data, onFinal, RequestMethod.Post);
  }

  /**
   * @param data {openid, activityId, name, mobile, productId}
   * @param onFinal
   * @returns {Observable<any>}
   */
  public join(data: any, onFinal?: any): Observable<any> {
    return HttpHelper.request(this.http, `${this.endPoint}activity/bargain/join`, data, onFinal, RequestMethod.Post);
  }

  /**
   * @param data {activityId, productId, pageNum, pageSize}
   * @returns {Observable<any>}
   */
  public getRank(data: any, onFinal?: any): Observable<any> {
    return HttpHelper.request(this.http, `${this.endPoint}activity/bargain/personList`,
      data, onFinal, RequestMethod.Get);
  }
}
