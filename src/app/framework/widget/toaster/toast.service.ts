/**
 * Created by xuchao on 16/10/3.
 */

import {Subject, Observable} from 'rxjs';
import {ToasterModel, ToastType} from './toast.model';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {ToasterComponent} from './toast.component';
@Injectable()
export class ToastService {

  public toastEmitted$: any;
  private toastCache: ToasterModel[] = [];

  private running = false;

  private toastEmitter = new Subject<ToasterModel>();

  public constructor() {
    this.toastEmitted$ = this.toastEmitter.asObservable();

  }

  public success(text: string) {
    this.popToast({text, type: ToastType.SUCCESS});
  }

  public fail(text: string) {
    this.popToast({text, type: ToastType.FAIL});
  }

  public info(text: string) {
    this.popToast({text, type: ToastType.INFO});
  }

  public warn(text: string) {
    this.popToast({text, type: ToastType.WARN});
  }

  public error(text: string) {
    this.popToast({text, type: ToastType.ERROR});
  }

  public popToast(toast: ToasterModel) {
    this.addToast(toast);
    this.takeToast();
  }

  public removeToast() {
    this.running = false;
    this.toastCache.shift();
    this.takeToast();
  }

  private addToast(toast: ToasterModel) {
    Observable.from(this.toastCache)
      .defaultIfEmpty({text: ''})
      .takeLast(1)
      .filter((it: any) => {
        return it.text !== toast.text;
      })
      .subscribe(() => {
        this.toastCache.push(toast);
      });
  }

  private takeToast() {
    if (this.running) {
      return;
    }
    Observable.from(this.toastCache)
      .take(1)
      .subscribe((a: any) => {
        this.running = true;
        this.toastEmitter.next(a);
      });
  }
}
