import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {ReceiptsPage} from '../receipts/receipts';
import {LoginPage} from '../login/login';
import {OnboardingPage} from '../onboarding/onboarding';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Storage} from '@ionic/storage';

@Component({selector: 'page-cards', templateUrl: 'cards.html'})
export class CardsPage {

  loading : any;

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public loadCtrl : LoadingController, public alertCtrl : AlertController, public iab : InAppBrowser, public storage : Storage) {

    /*this.loading = loadCtrl.create({content: 'Please wait, loading...'});
    this
      .loading
      .present();
    */
  }

  popCard(index)
  {
    if (index <= this.resProvider.cards.length) {
      let alert = this
        .alertCtrl
        .create({
          title: 'Remove card',
          message: 'Are you sure you want to remove this card?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                this
                  .resProvider
                  .cards
                  .splice(index, 1);
              }
            }, {
              text: 'No',
              role: 'cancel',
              handler: () => {
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
    this
      .navCtrl
      .setRoot(ReceiptsPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }

  newCard()
  {
    this
      .resProvider
      .addCard()
      .then((c) => {
        console.log(c);
      })
    /* 
    console.log(this.resProvider.user);
    const browser = this
      .iab
      .create('https://demo.zeipt.se/public/registercard/' + this.resProvider.user);
    */
  }

  logout() {
    this
      .resProvider
      .clearStorage();
    this
      .navCtrl
      .setRoot(LoginPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }
}
