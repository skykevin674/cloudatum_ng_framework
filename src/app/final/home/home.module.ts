/**
 * Created by xuchao on 2017/6/27.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpVote} from '../../framework/util/http/http.vote';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {HOME_ROUTES} from './home.routing';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(HOME_ROUTES)],
  declarations: [HomeComponent],
  providers: [HttpVote]
})
export class HomeModule {
}
