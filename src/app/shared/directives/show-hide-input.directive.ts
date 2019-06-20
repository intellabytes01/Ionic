import {
  Directive,
  ElementRef,
  Input,
  HostListener
} from '@angular/core';

@Directive({
// tslint:disable-next-line: directive-selector
  selector: '[prShowHideInput]'
})
export class ShowHideInputDirective {
  @Input() targetInput: any;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    const inType = this.targetInput.type === 'text' ? 'password' : 'text';
    this.targetInput.type = inType;
  }
}
