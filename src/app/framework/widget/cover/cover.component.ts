/**
 * Created by xuchao on 2016/11/1.
 */
import {
  Component, ViewChild, OnInit
} from '@angular/core';
import {CoverService} from './cover.service';
import {DynamicLoaderComponent} from './dynamic.component';
import {state, style, trigger} from '@angular/animations';
@Component({
  selector: 'cover',
  templateUrl: 'cover.component.html',
  styleUrls: ['cover.component.css'],
  animations: [
    trigger('showCover', [
      state('show', style({display: 'block'})),
      state('hide', style({display: 'none'}))
    ])
  ]
})
export class CoverComponent implements OnInit {
  public state: string = 'hide';
  private comp: any;

  @ViewChild(DynamicLoaderComponent)
  private loader: DynamicLoaderComponent;

  constructor(private cover: CoverService) {
  }

  public ngOnInit() {
    this.cover.coverWillShow$.subscribe((comp: any) => {
      console.log(comp);
      this.loader.add(comp.comp, comp.field, comp.value);
      this.state = 'show';
    });
    this.cover.coverWillHide$.subscribe(() => this.state = 'hide');

  }

  private close() {
    this.cover.hideCover();
  }
}
