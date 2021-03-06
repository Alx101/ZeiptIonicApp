import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';

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
  index = this
    .navParams
    .get("index");

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider) {}

  ionViewDidLoad() {
  }

  goBack() {
    this
      .navCtrl
      .pop();
  }

}
