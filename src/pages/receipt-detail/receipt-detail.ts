import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ReceiptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-receipt-detail', templateUrl: 'receipt-detail.html'})
export class ReceiptDetailPage {
  receipt = this
    .navParams
    .get("receipt");

  constructor(public navCtrl : NavController, public navParams : NavParams) {}

  ionViewDidLoad() {
    console.log(this.navParams.get("receipt"))
  }

  goBack() {
    this
      .navCtrl
      .pop();
  }

}
