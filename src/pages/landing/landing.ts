import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { ReceiptsPage } from '../receipts/receipts';

/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  cards: any = [];
  user: any = {
    name: 'the get-receipt guy'
  };
  loading:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public resProvider: ResourcesProvider,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    this.loading = loadCtrl.create({
      content: 'Please wait, loading...'
    });
    this.loading.present();

    resProvider.loadCards().then((c) => {
        this.cards = c;
        this.loading.dismiss();
    });

  }

  ionViewDidLoad() {
  }

  popCard(index)
  {
    if(index <= this.cards.length)
    {
      let alert = this.alertCtrl.create({
        title: 'Remove card',
        message: 'Are you sure you want to remove this card?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.cards.splice(index, 1);
            }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              //Do nothing I guess?
            }
          }
        ]
      });

      alert.present();
    }
  }

  goToReceipts()
  {
    this.navCtrl.push(ReceiptsPage, {});
  }

}
