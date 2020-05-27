import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{

    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    // @HostListener('click') toggleDropdown(){
    //     this.isOpen = !this.isOpen;
    // }
    constructor(private elRef: ElementRef) {}
}