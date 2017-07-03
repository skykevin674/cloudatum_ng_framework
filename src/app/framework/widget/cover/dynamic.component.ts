/**
 * Created by xuchao on 2016/11/8.
 */
import {
  Component, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import {CustomerModule} from '../../customer/customer.module';
@Component({
  selector: 'dynamic',
  template: '<div></div>'
})
export class DynamicLoaderComponent {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private vcRef: ViewContainerRef) {
  }

  public add(comp: any, field?: string, value?: any) {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(comp);
    this.vcRef.clear();
    let componentRef = this.vcRef.createComponent(componentFactory);
    if (field) {
      componentRef[field] = value;
    }
  }
}
