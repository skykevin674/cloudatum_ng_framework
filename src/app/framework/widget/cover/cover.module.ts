/**
 * Created by xuchao on 2016/11/1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoverComponent} from './cover.component';
import {CoverService} from './cover.service';
import {DynamicLoaderComponent} from './dynamic.component';
@NgModule({
  imports: [CommonModule],
  declarations: [CoverComponent, DynamicLoaderComponent],
  exports: [CoverComponent],
  providers: [CoverService]
})
export class CoverModule {}
