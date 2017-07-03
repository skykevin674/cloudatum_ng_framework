/**
 * Created by xuchao on 2016/10/21.
 */
import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeWhile';
@Injectable()
export class CoverService {
  public coverWillShow$;
  public coverWillHide$;
  private showing: boolean = false;

  private coverShowObserver = new Subject<any>();
  private coverHideObserver = new Subject<any>();

  constructor() {
    this.coverWillShow$ = this.coverShowObserver.asObservable();
    this.coverWillHide$ = this.coverHideObserver.asObservable();
  }

  public showCover(comp: any, field?: string, value?: any) {
    Observable.of(this.showing)
      .takeWhile((p: any) => {
        return !p;
      })
      .subscribe(() => {
        this.showing = true;
        this.coverShowObserver.next({comp, field, value});
      });

  }

  public hideCover() {
    Observable.of(this.showing)
      .takeWhile((p: any) => {
        return p;
      })
      .subscribe(() => {
        this.showing = false;
        this.coverHideObserver.next();
      });
  }
}
