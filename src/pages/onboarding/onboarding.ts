import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReceiptsPage} from '../receipts/receipts';
/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-onboarding', templateUrl: 'onboarding.html'})
export class OnboardingPage {

  constructor(public navCtrl : NavController, public navParams : NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
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
