import { Component, ViewChild, OnInit, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  accordionExpanded = false;
  @ViewChild("cc") cardContent: any;
  @Input("yearTitle") yearTitle: string;
  @Input("monthTitle") monthTitle: string;

  icon: string = "arrow-down";

  constructor(public renderer: Renderer2) {
    
  }

  ngOnInit(){
    this.renderer.setStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 200ms");
    console.log(this);
  }

  toggleAccordion(){
    
    if(this.accordionExpanded){
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", "0px");
    } else {
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", (this.cardContent.nativeElement.scrollHeight + "px"));
    }
    
    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down"
    console.log(this);
  }
}
