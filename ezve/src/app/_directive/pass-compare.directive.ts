
import { Directive } from '@angular/core';
import { Validator,  NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[PassCompare]',

  providers: [{provide: NG_VALIDATORS, useExisting: PassCompareDirective, multi: true}]
  
})
export class PassCompareDirective {

  // constructor(@Attribute('PassCompare') public comparer: string,
  // @Attribute('parent') public parent: string){}
}


