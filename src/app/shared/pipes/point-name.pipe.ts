import {Pipe, PipeTransform} from '@angular/core';
import {GameUtils, PointName} from '../../core';

@Pipe({
  name: 'pointname'
})
export class PointNamePipe implements PipeTransform {
  transform(value: PointName): string {
    return GameUtils.getPointNameLabel(value);
  }

}
