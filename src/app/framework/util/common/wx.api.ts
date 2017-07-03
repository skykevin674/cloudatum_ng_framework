import {Injectable} from '@angular/core';
/**
 * Created by xuchao on 2017/6/22.
 */
let wx = require('weixin-js-sdk');
@Injectable()
export class WxApi {
  public configWx(data: any, apiList: string[] = ['onMenuShareTimeline', 'onMenuShareAppMessage']) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.body.appid, // 必填，公众号的唯一标识
      timestamp: data.body.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.body.noncestr, // 必填，生成签名的随机串
      signature: data.body.signature, // 必填，签名，见附录1
      jsApiList: apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  }

  public onWxReady(callback: any) {
    wx.ready(() => {
      callback();
    });

  }

  public configShare(title: string, content: string, url: string, img: string, success?: any) {
    wx.ready(() => {
      let timeline = {
        title,
        link: url,
        imgUrl: img,
        success
      };
      let message = {
        title,
        desc: content,
        link: url,
        imgUrl: img,
        success
      };
      wx.onMenuShareAppMessage(message);
      wx.onMenuShareTimeline(timeline);
    });
  }
}
