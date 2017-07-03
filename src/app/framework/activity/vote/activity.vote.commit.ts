import {OnInit} from '@angular/core';
import {VoteBaseComponent} from './activity.vote.base';
import {HttpVote} from '../../util/http/http.vote';
import {LoaderService} from '../../widget/loader/loader.service';
import {ToastService} from '../../widget/toaster/toast.service';
import {ActivatedRoute} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
import {WxApi} from '../../util/common/wx.api';
import {FileUploader} from 'ng2-file-upload';
/**
 * Created by xuchao on 2017/6/27.
 */
declare let json;
export class VoteCommitBaseComponent extends VoteBaseComponent implements OnInit {

  protected mobile: string = json.fans.body.phoneNum;
  protected name: string = json.fans.body.nickname;
  protected desc: string;

  protected upload: string[] = [];
  protected uploader: FileUploader;

  constructor(protected storage: SessionStorageService, protected route: ActivatedRoute,
              protected toast: ToastService, protected loader: LoaderService, protected http: HttpVote,
              protected wx: WxApi) {
    super(storage, route, toast, loader, http, wx);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.activityId = this.route.snapshot.queryParams['activityId'];
    this.configUploader();
  }

  public join() {
    if (!this.check()) {
      return;
    }
    this.loader.popLoader('正在参与');
    this.http.join({
      openid: this.openid, activityId: this.activityId, name: this.name, uploadImg: this.upload[0],
      nickname: json.fans.body.nickname, phoneNum: this.mobile, des: this.desc, headImgUrl: json.fans.body.headImgUrl
    }, () => this.loader.dismissLoader()).subscribe((data: any) => {
      if (data.code === 0) {
        json.my = data.body;
        json.info.body.joinCount++;
        this.onJoinSuccess(data.body);
      } else {
        this.toast.info(data.msg);
      }
    });
  }

  protected onJoinSuccess(item: any) {
    console.log(item);
  }

  protected check(): boolean {
    return true;
  }

  protected configUploader() {
    this.uploader = new FileUploader({
      url: `http://upload.upload.cloudatum.com/upload/activity/vote/${this.activityId}?openid=${this.openid}&originalid=${this.originalId}`,
      autoUpload: true,
      isHTML5: true,
      itemAlias: 'uploadFile',
      queueLimit: 1
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      return {file};
    };

    this.uploader.onBeforeUploadItem = (fileItem) => {
      this.loader.popLoader('正在上传');
      return {fileItem};
    };

    this.uploader.onSuccessItem = (_, resp) => {
      const response = JSON.parse(resp);
      if (response.code === 0) {
        this.upload[0] = response.msg;
      } else {
        this.toast.info(response.msg);
      }
    };

    this.uploader.onErrorItem = (_, resp, status) => {
      switch (status) {
        case 404:
          this.toast.error('请求地址错误');
          break;
        case 500:
          this.toast.error('服务器错误');
          break;
        case 502:
          this.toast.error('服务器宕机');
          break;
        default:
          this.toast.error('未知错误' + status);
          break;
      }
    };

    this.uploader.onCompleteItem = () => this.loader.dismissLoader();
  }

}
