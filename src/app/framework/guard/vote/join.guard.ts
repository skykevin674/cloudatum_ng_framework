import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route,
  RouterStateSnapshot
} from '@angular/router';
/**
 * Created by xuchao on 2017/6/27.
 */
declare const json;
export class JoinGuard implements CanActivateChild, CanLoad, CanActivate {

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canPass();
  }

  public canLoad(route: Route): boolean {
    return this.canPass();
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canPass();
  }

  protected canPass(): boolean {
    if (!json.my) {
      return true;
    }
    this.onCheckFail(json.my);
    return false;
  }

  protected onCheckFail(item: any) {
    console.log(item);
  }
}
