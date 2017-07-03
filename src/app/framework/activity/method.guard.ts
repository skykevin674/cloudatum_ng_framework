import {ActivityComponent} from './activity.component';
import {Subject} from 'rxjs/Subject';
/**
 * Created by xuchao on 2017/6/16.
 */
const methodEmitter = new Subject<any>();
export const methodEmitted$ = methodEmitter.asObservable();

declare const json;

const sendMessage = (target: any, callback?: string) => {
  return () => {
    let _callback = target.onNotFollow;
    if (callback && typeof callback === 'string') {
      _callback = target[callback] || target.onNotFollow;
    }
    methodEmitter.next(_callback);
    return null;
  };
};

export function NeedFollow(callback?: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    console.log(json.fans)
    if (!json.fans || json.fans.code !== 0 || json.fans.body.status !== 1) {
      descriptor.value = sendMessage(target, callback);
    }
    return descriptor;
  };
}

export function CheckDate(callback?: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const date = new Date().getTime();
    if (json.config.code !== 0 || json.config.body.config.startDate > date || json.config.body.config.endDate < date) {
      descriptor.value = sendMessage(target, callback);
    }
    return descriptor;
  };
}

export function NeedRegister(callback?: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    if (json.fans && !json.fans.body.phoneNum) {
      descriptor.value = sendMessage(target, callback);
    }
    return descriptor;
  };

}
