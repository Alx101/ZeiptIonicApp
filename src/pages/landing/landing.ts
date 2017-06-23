import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';

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
  loading:any;

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

    resProvider.loadCards().then((c) => {
        this.cards = c;
        this.loading.dismiss();
    });

  }

  ionViewDidLoad() {
  }

}
