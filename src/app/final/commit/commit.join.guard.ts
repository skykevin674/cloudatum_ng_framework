/**
 * Created by xuchao on 2017/6/27.
 */
import {Injectable} from '@angular/core';
import {FollowGuard} from '../../framework/guard/follow.guard';
import {ToastService} from '../../framework/widget/toaster/toast.service';
import {JoinGuard} from '../../framework/guard/vote/join.guard';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
@Injectable()
export class CommitJoinGuard extends JoinGuard {

  constructor(protected storage: SessionStorageService, protected router: Router) {
    super();
  }

  protected onCheckFail(item: any) {
    this.storage.store('item', item);
    this.router.navigate(['/detail', item.id], {queryParamsHandling: 'preserve'});
  }

}
