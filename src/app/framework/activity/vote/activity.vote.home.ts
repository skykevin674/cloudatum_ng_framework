import {ActivityComponent} from '../activity.component';
import {OnInit} from '@angular/core';
import {VoteBaseComponent} from './activity.vote.base';
import {SessionStorageService} from 'ng2-webstorage';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../widget/toaster/toast.service';
import {LoaderService} from '../../widget/loader/loader.service';
import {HttpVote} from '../../util/http/http.vote';
import {WxApi} from '../../util/common/wx.api';
/**
 * Created by xuchao on 2017/6/22.
 */
declare let json;
export class VoteHomeBaseComponent extends VoteBaseComponent implements OnInit {

  protected activityInfo: any = json.info;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected toast: ToastService, protected loader: LoaderService, protected http: HttpVote,
              protected wx: WxApi) {
    super(storage, route, toast, loader, http, wx);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.load();
  }
}
