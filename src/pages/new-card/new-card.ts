import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesProvider } from "../../providers/resources/resources";

/**
 * Generated class for the NewCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-new-card',
    templateUrl: 'new-card.html',
})
export class NewCardPage {
  apiHtml: any;
  cardForm:FormGroup;
  valid:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public resources: ResourcesProvider) {
      this.valid = false;
      this.cardForm = formBuilder.group({
          cardnum: ['', Validators.compose([Validators.maxLength(19), Validators.minLength(16), Validators.pattern('[0-9 ]*'), Validators.required])],
          cardmonth: ['', Validators.compose([Validators.maxLength(2), Validators.minLength(2), Validators.pattern('[0-9 ]*'), Validators.required])],
          cardyear: ['', Validators.compose([Validators.maxLength(2), Validators.minLength(2), Validators.pattern('[0-9 ]*'), Validators.required])],
          cardcvc: ['', Validators.compose([Validators.maxLength(3), Validators.minLength(3), Validators.pattern('[0-9 ]*'), Validators.required])],
      });
      console.log(this.cardForm);
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad NewCardPage');
  }

  addCard() {
      this.resources.addCard({
          type: 'MasterCard',
          token: '6a284f27a0e5627bd9ad746a3bf2c46f',
          last4: '1234'
      });
  }

  testAuthAPI() {
    this.resources.initiateCardRegistration().then(data => {
      document.getElementById('apiTest').innerHTML = data.toString();
      window['onLoadIntegrationFormPost']();
    });
  }

}
