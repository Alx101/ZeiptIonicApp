import { Component, ViewChild, OnInit, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  accordionExpanded = true;
  @ViewChild("cc") cardContent: any;
  @Input("yearTitle") yearTitle: string;
  @Input("monthTitle") monthTitle: string;

  //@Input("firstAccordion") firstAccordion: any;

  icon: string = "arrow-down";

  constructor(public renderer: Renderer2) {
    
  }

  ngOnInit(){
    this.renderer.setStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 200ms");
    
    //this.toggleAccordion();
    this.renderer.setStyle(this.cardContent.nativeElement, "max-height", "5000px");
  }

  toggleAccordion(){
    
    if(this.accordionExpanded){
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", "0px");
    } else {
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", (this.cardContent.nativeElement.scrollHeight + "px"));
    }
    
    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down"
  }
}
