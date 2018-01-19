import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ReceiptsPage} from '../receipts/receipts';
import {InAppBrowser} from "@ionic-native/in-app-browser";
/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-onboarding', templateUrl: 'onboarding.html'})
export class OnboardingPage {

  constructor(public navCtrl : NavController, public navParams : NavParams, public iab : InAppBrowser) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
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
