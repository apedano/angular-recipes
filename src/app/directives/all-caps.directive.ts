import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllCaps]',
  standalone: true
})
export class AllCapsDirective  {

  constructor(private el: ElementRef) { 
    //  this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('keyup', ['$event']) onkeyup(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('yellow');
  // }
  
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight('');
  // }

  // private highlight(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

}

