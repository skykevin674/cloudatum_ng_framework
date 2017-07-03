/**
 * Created by xuchao on 2016/10/9.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToasterComponent} from './toast.component';
import {ToastService} from './toast.service';
import {TypeToBackground, TypeToFontColor} from './pipes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [ToasterComponent, TypeToBackground, TypeToFontColor],
  providers: [ToastService],
  exports: [ToasterComponent]
})
export class ToastModule {}
