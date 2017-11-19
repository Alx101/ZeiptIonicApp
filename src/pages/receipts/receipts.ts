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
    curDatePart:any;

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

        if(navParams.get('parts') != null) {
            //console.log(navParams.get('parts'));
            this.receiptParts = navParams.get('parts');
            this.curDatePart = this.receiptParts[0];
            this.loading.dismiss();
        } else {
            resProvider.loadReceiptParts().then((c) => {
                this.receiptParts = c;
                this.curDatePart = c[0];
                this.loading.dismiss();
            });
        }
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
            currentSet: this.curDatePart
        });

        popover.present({
            ev: ev
        });

        popover.onDidDismiss((popoverData) => {
            this.curDatePart = popoverData;
        })
    }

    goToReceipt(set) {
        console.log(set);

        this.navCtrl.push(ReceiptsPage, {
            parts: set
        });
    }


}
