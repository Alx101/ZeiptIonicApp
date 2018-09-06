import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {DomSanitizer} from '@angular/platform-browser';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';

/**
 * Generated class for the CardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-card-modal', templateUrl: 'card-modal.html'})
export class CardModalPage {

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public sanitizer : DomSanitizer, private iab : InAppBrowser) {}

  openWebpage() {
    const options : InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this
      .iab
      .create('https://demo.zeipt.se/public/registercard/' + this.resProvider.user.gcid + '?token=' + this.resProvider.user.token, '_blank', options);
  }

  registerUrl() {
    return this
      .sanitizer
      .bypassSecurityTrustResourceUrl('https://demo.zeipt.se/public/registercard/' + this.resProvider.user.gcid + '?token=' + this.resProvider.user.token);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardModalPage');
  }

  goBack() {
    this
      .navCtrl
      .pop();
  }

}
