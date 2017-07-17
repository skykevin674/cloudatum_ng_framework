import {Routes} from '@angular/router';
import {HomeComponent} from './home';
import {NoContentComponent} from './no-content';
import {TestComponent} from './home/test.component';
import {CommitFollowGuard} from './final/commit/commit.follow.guard';
import {CommitRegisterGuard} from './final/commit/commit.register.guard';

export const ROUTES: Routes = [
  {path: 'list', loadChildren: 'app/final/bargain/list/list.module#ListModule'},
  {path: 'join/:productId', loadChildren: 'app/final/bargain/join/join.module#JoinModule'},
  {path: 'home', loadChildren: 'app/final/home/home.module#HomeModule'},
  {path: 'commit', loadChildren: 'app/final/commit/commit.module#CommitModule'},
  {path: 'detail', loadChildren: 'app/final/detail/detail.module#DetailModule'},
  // { path: '**',    component: RouterComponent },
];
