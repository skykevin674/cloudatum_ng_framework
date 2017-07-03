/**
 * Created by xuchao on 2017/6/27.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommitComponent} from './commit.component';
import {RouterModule} from '@angular/router';
import {COMMIT_ROUTES} from './commit.routing';
import {CommitFollowGuard} from './commit.follow.guard';
import {CommitRegisterGuard} from './commit.register.guard';
import {CommitJoinGuard} from './commit.join.guard';
import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(COMMIT_ROUTES), FileUploadModule],
  declarations: [CommitComponent],
  // exports: [CommitJoinGuard, CommitRegisterGuard],
  providers: [CommitFollowGuard, CommitRegisterGuard, CommitJoinGuard]
})
export class CommitModule {

}
