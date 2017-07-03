import {Routes} from '@angular/router';
import {CommitComponent} from './commit.component';
import {CommitFollowGuard} from './commit.follow.guard';
import {CommitRegisterGuard} from './commit.register.guard';
import {CommitJoinGuard} from './commit.join.guard';
/**
 * Created by xuchao on 2017/6/27.
 */
export const COMMIT_ROUTES: Routes = [
  {path: '', component: CommitComponent, canActivate: [CommitFollowGuard, CommitRegisterGuard, CommitJoinGuard]}
];
