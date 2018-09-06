import {
  Component,
  ViewChild,
  OnInit,
  Renderer,
  Input,
  ElementRef
} from '@angular/core';

@Component({selector: 'expandable', templateUrl: 'expandable.html'})
export class ExpandableComponent {

  accordionExpanded = false;
  @ViewChild('expandWrapper', {read: ElementRef})expandWrapper;
  @Input('expanded')expanded;
  @Input('service')service;
  @Input('serviceimg')serviceimg;
  @Input('expandHeight')expandHeight;

  constructor(public renderer : Renderer) {}

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandWrapper.nativeElement.scrollHeight + 'px');   
  }
}