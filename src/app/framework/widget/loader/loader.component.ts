/**
 * Created by xuchao on 2016/10/21.
 */
import {Component, OnInit} from '@angular/core';
import {LoaderService} from './loader.service';
import {state, style, trigger} from '@angular/animations';
@Component({
  selector: 'loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css'],
  animations: [
    trigger('showLoader', [
      state('show', style({display: 'block'})),
      state('hide', style({display: 'none'}))
    ])
  ]
})
export class LoaderComponent implements OnInit {
  public text: string = 'test';
  public state: string = 'hide';

  constructor(private loader: LoaderService) {
  }

  public ngOnInit() {
    this.loader.loaderWillPop$.subscribe((text: string) => {
      this.text = text;
      this.state = 'show';
    });
    this.loader.loaderWillDismiss$.subscribe(() => this.state = 'hide');
  }

}
