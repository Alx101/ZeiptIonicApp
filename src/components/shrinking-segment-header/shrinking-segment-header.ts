import { Component, Input, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the ShrinkingSegmentHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'shrinking-segment-header',
  templateUrl: 'shrinking-segment-header.html'
})
export class ShrinkingSegmentHeader {
  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  @Input('minHeaderHeight') minHeaderHeight: number;

  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer) {
  }

  ngAfterViewInit(){
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });
  }

  resizeHeader(ev){
    ev.domWrite(() => {

      this.newHeaderHeight = this.headerHeight - ev.scrollTop;

      if(this.newHeaderHeight < this.minHeaderHeight){
        this.newHeaderHeight = this.minHeaderHeight;
      }

      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

    });
  }
}
