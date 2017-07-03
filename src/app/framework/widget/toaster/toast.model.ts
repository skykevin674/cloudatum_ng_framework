/**
 * Created by xuchao on 16/10/8.
 */
export interface ToasterModel {
  text: string;
  type?: ToastType;
  displayDelay?: number;
}

export enum ToastType {
  SUCCESS = 0xdff0d8,
  FAIL = 0x428bca,
  WARN = 0xfcf8e3,
  ERROR = 0xf2dede,
  INFO = 0xd9edf7
}
