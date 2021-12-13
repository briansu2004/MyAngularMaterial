// highlight.directive.ts

import {
  Directive,
  Input,
  SimpleChanges,
  Renderer2,
  ElementRef,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input()
  searchedWord!: string; // searchText
  // searchText
  @Input()
  content!: string; // HTML content
  // HTML content
  @Input()
  classToApply: string = 'font-weight-bold'; //class to apply for highlighting
  //class to apply for highlighting
  @Input() setTitle = false; //sets title attribute of HTML

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (this.setTitle) {
      this.renderer.setProperty(this.el.nativeElement, 'title', this.content);
    }

    if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        this.content
      );
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    // console.log('re: ', re);
    // console.log('this.content: ', this.content);
    // console.log(
    //   'after replacing: ',
    //   this.content.replace(re, `<span class="font-weight-bold">$1</span>`)
    // );
    //return this.content.replace(re, `<span class="font-weight-bold">$1</span>`);
    return this.content.replace(
      re,
      `<span class="${this.classToApply}">$1</span>`
    );
    //`<span class="${this.classToApply}">$1</span>`
  }
}
