import {Component, HostBinding, Input} from '@angular/core';
import {Point} from '../../../core';

@Component({
    selector: 'point',
    template: `{{value?.strike ? '-' : value?.pristine ? '' : value?.value}}`,
    standalone: false
})
export class PointComponent {

  private _value: Point | undefined;

  @HostBinding('class.point') classPoint = true;
  @HostBinding('class.pristine') classPristine = false;
  @HostBinding('class.valid') classValid = false;
  @HostBinding('class.strike') classStrike = false;
  @HostBinding('class.bonus') classBonus = false;
  @HostBinding('class.sum') classSum = false;

  @Input() set value(value: Point | undefined) {
    this._value = value;
    this.classPristine = !!value?.pristine;
    this.classStrike = !!value?.strike;
    this.classValid = !value?.strike && !value?.pristine && !!value?.value;
  }
  get value(): Point | undefined  {
    return this._value;
  }

  @Input() set isBonus(value: boolean) {
    this.classBonus = value;
  }

  @Input() set isSum(value: boolean) {
    this.classSum = true;
    this.classValid = false;
  }

}
