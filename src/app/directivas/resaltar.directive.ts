import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  @Input() colorBase!: string;
  @Input('appResaltar') resaltarColor!: string;

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.resaltar(this.resaltarColor || this.colorBase || "yellow");
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.resaltar("");
  }

  resaltar(color: string){
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

}
