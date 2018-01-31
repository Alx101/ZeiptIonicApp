import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ReceiptsPage} from '../receipts/receipts';
import {InAppBrowser} from "@ionic-native/in-app-browser";

import {ResourcesProvider} from '../../providers/resources/resources';
/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-onboarding', templateUrl: 'onboarding.html'})
export class OnboardingPage {
  cards : any = [];

  constructor(public resProvider : ResourcesProvider, public navCtrl : NavController, public navParams : NavParams, public iab : InAppBrowser) {
    resProvider
      .loadCards()
      .then((c) => {
        this.cards = c;
        if (this.cards.length > 0) {
          this.navCtrl.setRoot(ReceiptsPage)
        } else {
          console.log("no cards");
        }
      })
  }

  ionViewDidLoad() {
  }
  newCard()
  {
    const browser = this
      .iab
      .create('http://demo.zeipt.se/public/registercard/1234');
  }

  goToReceipts()
  {
    this
      .navCtrl
      .setRoot(ReceiptsPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }
}
