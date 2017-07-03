/**
 * Created by xuchao on 2016/10/21.
 */
import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeWhile';
@Injectable()
export class LoaderService {

  public loaderWillPop$;
  public loaderWillDismiss$;

  private popping: boolean = false;

  private loaderPopObserver = new Subject<string>();
  private loaderDismissObserver = new Subject<string>();

  constructor() {
    this.loaderWillPop$ = this.loaderPopObserver.asObservable();
    this.loaderWillDismiss$ = this.loaderDismissObserver.asObservable();
  }

  public popLoader(text: string) {
    Observable.of(this.popping)
      .takeWhile((p: any) => {
        return !p;
      })
      .subscribe(() => {
        this.popping = true;
        this.loaderPopObserver.next(text);
      });

  }

  public dismissLoader() {
    Observable.of(this.popping)
      .takeWhile((p: any) => {
        return p;
      })
      .subscribe(() => {
        this.popping = false;
        this.loaderDismissObserver.next();
      });
  }
}
