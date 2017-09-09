import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { LandingPage } from '../landing/landing';
import { YearPopoverPage } from '../year-popover/year-popover';

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
  curYear:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public resProvider: ResourcesProvider,
    public loadCtrl: LoadingController,
    public popoverCtrl: PopoverController
  ) {
    this.loading = loadCtrl.create({
      content: 'Please wait, loading...'
    });
    this.loading.present();

    resProvider.loadReceiptParts().then((c) => {
        this.receiptParts = c;
        this.curYear = c[0];
        this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
  }

  goToCards()
  {
    this.navCtrl.setRoot(LandingPage, {}, {animate: true, direction: 'forward'});
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(YearPopoverPage, {
      dataSet: this.receiptParts,
      currentSet: this.curYear
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((popoverData) => {
      this.curYear = popoverData;
    })
  }


}
