/**
 * Created by xuchao on 2017/6/22.
 */
import {CoverService} from './cover.service';
export class CoverContentBase {
  constructor(private cover: CoverService) {
  }

  public close() {
    this.cover.hideCover();
  }
}
