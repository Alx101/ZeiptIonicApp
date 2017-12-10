import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { LandingPage } from '../landing/landing';
import {ReceiptDetailPage} from "../receipt-detail/receipt-detail";

/**
 * Generated class for the ReceiptsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
})
export class ReceiptsPage {

  receiptParts: any = [];
  loading:any;
  curDatePart:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public resProvider: ResourcesProvider,
    public loadCtrl: LoadingController
  ) {
    this.loading = loadCtrl.create({
      content: 'Please wait, loading...'
    });
    this.loading.present();

    resProvider.loadReceiptParts().then((c) => {
      this.receiptParts = c;
      console.log(c);
      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
  }

  goToCards()
  {
    this.navCtrl.setRoot(LandingPage, {}, {animate: true, direction: 'forward'});
  }

  goToReceipt(reciept) {
    this.navCtrl.push(ReceiptDetailPage, {
      receipt: reciept
    });
  }


}
