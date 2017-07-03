/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {SessionStorageService} from 'ng2-webstorage';
import {NavigationStart, Router} from '@angular/router';
import {WxApi} from './framework/util/common/wx.api';
declare let json;
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <toaster></toaster>
    <loader></loader>
    <cover></cover>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(private storage: SessionStorageService,
              private router: Router, private wx: WxApi) {
    router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationStart && evt.url === '/') {
        this.navigate();
      }
    });
  }

  public ngOnInit() {
    this.navigate();
  }

  private navigate() {
    if (json.products.code === 0 && json.products.body.length > 0) {
      const queryParams = {
        activityId: json.products.body[0].activityId,
        originalId: 'gh_7917af06449b',
        openid: json.fans && json.fans.code === 0 ? json.fans.body.openId : null
      };
      this.router.navigate(['/list'], {queryParams});
    } else {
      alert('活动不存在');
    }
    /**
     * 投票
     */
    // if (json.config.code === 0) {
    //   const queryParams = {
    //     activityId: json.config.body.config.id,
    //     originalId: json.config.body.config.originalId,
    //     openid: json.fans && json.fans.code === 0 ? json.fans.body.openId : null
    //   };
    //   if (json.item) {
    //     this.storage.store('item', json.item);
    //     this.router.navigate(['/detail', json.item.id], {queryParams});
    //   } else {
    //     this.router.navigate(['/home'], {queryParams});
    //   }
    // } else {
    //   alert('活动不存在');
    // }
  }
}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
