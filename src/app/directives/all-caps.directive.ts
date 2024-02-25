import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllCaps]',
  standalone: true
})
export class AllCapsDirective {

  constructor() { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

}
