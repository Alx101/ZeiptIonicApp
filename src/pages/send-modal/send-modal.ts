import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, App} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';

@Component({selector: 'page-send-modal', templateUrl: 'send-modal.html'})
export class SendModalPage {
  data = this
    .navParams
    .get("data");

  items : any = [];
  itemExpandHeight : number = 100;

  constructor(public navCtrl : NavController, public navParams : NavParams, public viewCtrl : ViewController, public appCtrl : App, public resProvider : ResourcesProvider) {
    this.items = [
      {
        service: 'Visma',
        serviceimg: 'vismalogo.png',
        expanded: false
      }, {
        service: '24SevenOffice',
        serviceimg: 'sevenofficelogo.svg',
        expanded: false
      }, {
        service: 'fiken',
        serviceimg: 'fikenlogo.png',
        expanded: false
      }
    ];
  }
  expandItem(item) {
    this
      .items
      .map((listItem) => {

        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
          document
            .getElementById(item.service)
            .getElementsByTagName('ion-icon')[0]
            .classList
            .toggle("not-up");
        } else {
          listItem.expanded = false;
          if (!document.getElementById(listItem.service).getElementsByTagName('ion-icon')[0].classList.contains("not-up")) {
            document
              .getElementById(listItem.service)
              .getElementsByTagName('ion-icon')[0]
              .classList
              .toggle("not-up");
          }
        }
        return listItem;
      });
  }

  goBack() {
    this
      .navCtrl
      .pop();
  }

}
