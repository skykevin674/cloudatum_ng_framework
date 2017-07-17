/**
 * Created by xuchao on 2017/7/3.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {JoinComponent} from './join.component';
import {RouterModule} from '@angular/router';
import {JOIN_ROUTES} from './join.routing';
@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(JOIN_ROUTES)],
  declarations: [JoinComponent]
})
export class JoinModule {
}
