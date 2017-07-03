/**
 * Created by xuchao on 2017/6/30.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LIST_ROUTES} from './list.routing';
import {ListComponent} from './list.component';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(LIST_ROUTES)],
  declarations: [ListComponent]
})
export class ListModule {
}
