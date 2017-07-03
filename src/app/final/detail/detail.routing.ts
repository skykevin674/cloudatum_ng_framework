import {Routes} from '@angular/router';
import {DetailComponent} from './detail.component';
import {DetailItemResolver} from './detail.item.resolver';
import {DetailRankResolver} from '../../framework/resolver/vote/detail.rank.resolver';
/**
 * Created by xuchao on 2017/6/27.
 */
export const DETAIL_ROUTES: Routes = [
  {
    path: ':id', component: DetailComponent, resolve: {item: DetailItemResolver, rank: DetailRankResolver}
  }
];
