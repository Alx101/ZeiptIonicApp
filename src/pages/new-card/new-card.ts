import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  cardForm:FormGroup;
  valid:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {
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

}
