import { Pipe, PipeTransform } from '@angular/core';
import { DicService } from '../service/dic/dic.service';

@Pipe({
  name: 'bas_dic',
  pure: false,
})
export class DicPipe implements PipeTransform {
  constructor(private dicService: DicService) {}

  transform(
    value: any
    // , args?: any
  ): any {
    return this.dicService.translate(value);
  }
}
