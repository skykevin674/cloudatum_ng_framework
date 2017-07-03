import {OnDestroy, OnInit} from '@angular/core';
import {methodEmitted$} from './method.guard';
import {AppUtil} from '../util/common/app.util';
import {SessionStorage, SessionStorageService} from 'ng2-webstorage';
import {ActivatedRoute} from '@angular/router';
import {WxApi} from '../util/common/wx.api';
/**
 * Created by xuchao on 2017/6/16.
 */
declare let json;

export class ActivityComponent implements OnInit, OnDestroy {
  protected obv: any;
  protected openid: string;
  protected originalId: string;
  protected scope: string;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute, protected wx: WxApi) {
  }

  public ngOnInit() {
    this.openid = this.route.snapshot.queryParams['openid'];
    this.originalId = this.route.snapshot.queryParams['originalId'];
    this.scope = this.route.snapshot.queryParams['scope'];
    if (!json.wxReady) {
      this.wx.configWx(json.wx);
      this.wx.onWxReady(() => {
        json.wxReady = true;
      });
    }
    this.obv = methodEmitted$.subscribe((method: any) => {
      if (method && typeof method === 'function') {
        method.apply(this);
      }
    });
  }

  public ngOnDestroy() {
    if (this.obv) {
      this.obv.unsubscribe();
    }
  }

  public onNotFollow() {
    console.log('not follow');
  }

  protected onNotRegister() {
    console.log('not register');
  }

  protected onOutDate() {
    console.log('out date');
  }

  protected onVoteSelf() {
    console.log('vote my');
  }
}
