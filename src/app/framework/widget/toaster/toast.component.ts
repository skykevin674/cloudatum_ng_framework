/**
 * Created by xuchao on 2016/10/8.
 */
import {Component, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {ToastType} from './toast.model';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import 'rxjs/add/operator/delay';
@Component({
  selector: 'toaster',
  styleUrls: ['toast.component.css'],
  // template: `
  //   <div class='toast' [style.background]='type|type2Bg'
  //        [style.color]='type|typeToFontColor' [ngClass]='anim'>
  //     {{text}}
  //   </div>
  // `,
  template: `
    <div class='toast' [style.background]='type|type2Bg'
         [style.color]='type|typeToFontColor' [@showToast]='state'>{{text}}
    </div>`,
  animations: [
    trigger('showToast', [
      state('show', style({})),
      state('hide', style({visibility: 'hidden'})),
      transition('hide => show',
        [
          animate(200, keyframes([
            style({
              'opacity': 0,
              '-webkit-transform': 'translate(3000px, 0)',
              'transform': 'translate(3000px, 0)',
              'offset': 0
            }),
            style({
              'opacity': 1,
              '-webkit-transform': 'translate(-25px, 0)',
              'transform': 'translate(-25px, 0)',
              'offset': 0.6
            }),
            style({
              '-webkit-transform': 'translate(10px, 0)',
              'transform': 'translate(10px, 0)',
              'offset': 0.75
            }),
            style({
              '-webkit-transform': 'translate(-5px, 0)',
              'transform': 'translate(-5px, 0)',
              'offset': 0.9
            }),
            style({
              '-webkit-transform': 'none',
              'transform': 'none',
              'offset': 1.0
            }),
          ]))
        ]
      ),
      transition('show => hide', [
        animate(200, keyframes([
          style({
            '-webkit-transform': 'translate3d(0, 0, 0)',
            'transform': 'translate3d(0, 0, 0)',
            'offset': 0
          }),
          style({
            'visibility': 'hidden',
            '-webkit-transform': 'translate3d(-100%, 0, 0)',
            'transform': 'translate3d(-100%, 0, 0)',
            'offset': 1
          })
        ]))
      ])
    ])
  ]
})
export class ToasterComponent implements OnInit {
  public state: string = 'hide';
  public anim: string;

  public type: ToastType = ToastType.INFO;
  public text: string;
  private defaultDelay = 2000;

  constructor(private toastService: ToastService) {
  }

  public ngOnInit() {
    this.toastService.toastEmitted$.subscribe((a: any) => {
      this.state = 'show';
      // this.anim = 'show';
      this.text = a.text;
      this.type = a.type || ToastType.INFO;
      this.defaultDelay = a.displayDelay || this.defaultDelay;
    });
    this.toastService.toastEmitted$.delay(this.defaultDelay)
      .subscribe(() => {
        this.state = 'hide';
        // this.anim = 'hide';
      });
    this.toastService.toastEmitted$.delay(this.defaultDelay + 200)
      .subscribe(() => {
        this.toastService.removeToast();
        // this.anim = null;
      });
  }
}
