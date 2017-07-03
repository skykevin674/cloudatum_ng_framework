/**
 * Created by xuchao on 2016/10/21.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader.component';
import {LoaderService} from './loader.service';
@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent],
  providers: [LoaderService],
  exports: [LoaderComponent]
})
export class LoaderModule {}
