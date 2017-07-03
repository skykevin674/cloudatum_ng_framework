import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';
// App is our top level component
import {AppComponent} from './app.component';

// import '../styles/styles.scss';
// import '../styles/headings.css';
import '../styles/main.css';

import {ToastModule} from './framework/widget/toaster/toast.module';
import {Ng2Webstorage} from 'ng2-webstorage';
import {LoaderModule} from './framework/widget/loader/loader.module';
import {CoverModule} from './framework/widget/cover/cover.module';
import {WxApi} from './framework/util/common/wx.api';
// Application wide providers

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules, initialNavigation: false}),
    ToastModule,
    LoaderModule,
    CoverModule,
    Ng2Webstorage
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    WxApi
  ]
})
export class AppModule {

  constructor() { }

}
