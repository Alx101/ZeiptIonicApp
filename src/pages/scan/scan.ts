import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import fixOrientation from 'fix-orientation';

@IonicPage()
@Component({selector: 'page-scan', templateUrl: 'scan.html'})
export class ScanPage {

  @ViewChild('inputcamera')cameraInput : ElementRef;
  @ViewChild('imgresult')imgResult : ElementRef;
  img = '';

  displayCard() {
    return this.img !== '';
  }

  constructor() {}

  ionViewDidLoad() {
  
    //MY BIT
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      const reader = new FileReader();

      reader.onload = (r : any) => {
        let base64 = r.target.result as string;
        fixOrientation(base64, {
          image: true
        }, (fixed : string, image : any) => {
          this.img = fixed;
        });
      };
      reader.readAsDataURL(element.files[0]);
    };
  }
  ionViewDidEnter() {

  }
  
  logshit(){
  }
}
