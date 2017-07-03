/**
 * Created by xuchao on 2017/6/27.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail.component';
import {RouterModule} from '@angular/router';
import {DETAIL_ROUTES} from './detail.routing';
import {HttpVote} from '../../framework/util/http/http.vote';
import {DetailItemResolver} from './detail.item.resolver';
import {DetailRankResolver} from '../../framework/resolver/vote/detail.rank.resolver';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(DETAIL_ROUTES)],
  declarations: [DetailComponent],
  providers: [HttpVote, DetailItemResolver, DetailRankResolver]
})
export class DetailModule {}
