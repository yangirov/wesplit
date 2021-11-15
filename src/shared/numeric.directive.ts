import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[type=number], input[numbersOnly]',
})
export class NumericDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');

    if (initialValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
