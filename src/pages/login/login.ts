import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from './password-validation';
import {CardsPage} from '../cards/cards';
import {ReceiptsPage} from '../receipts/receipts';

@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {

  user : any = {};
  cards : any = [];
  receipts : any = [];
  registerUserView : boolean = false;
  loginUserView : boolean = false;

  registerForm : FormGroup;
  loginForm : FormGroup;

  emailPattern = /^\S+@\S+\.\S+$/;

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public formBuilder : FormBuilder) {

    this.loginForm = formBuilder.group({
      username: [
        '', Validators.compose([
          Validators.pattern(this.emailPattern),
          Validators.required
        ])
      ],
      fake_password: [],
      password: [
        '', Validators.compose([Validators.required])
      ]
    });

    this.registerForm = formBuilder.group({
      username: [
        '', Validators.compose([
          Validators.pattern(this.emailPattern),
          Validators.required
        ])
      ],
      fake_password: [],
      password: [
        '', Validators.compose([Validators.required])
      ],
      confirmPassword: [
        '', Validators.compose([Validators.required])
      ]
    }, {validator: PasswordValidation.MatchPassword});
  }

  loginView() {
    this.registerUserView = false;
    this.loginUserView = true;
  }
  registerView() {
    this.loginUserView = false;
    this.registerUserView = true;
  }

  loginUser() {
    this
      .resProvider
      .loginUser(this.loginForm.value.username)
      .then(data => {
        this.user = data;

        this
          .resProvider
          .loadCards()
          .then((c) => {
            this.cards = c;
            this
              .resProvider
              .loadReceiptJson()
              .then((receipts) => {
                this.receipts = receipts
                if (this.cards.length == 0 && this.receipts.length == 0) {
                  this
                    .navCtrl
                    .setRoot(CardsPage, {}, {
                      animate: true,
                      direction: 'forward'
                    })
                } else {
                  this
                    .navCtrl
                    .setRoot(ReceiptsPage, {}, {
                      animate: true,
                      direction: 'forward'
                    })
                }
              })
          })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  registerUser() {
    this
      .resProvider
      .registerUser(this.registerForm.value.username)
      .then(data => {
        this.user = data;
        this
          .navCtrl
          .setRoot(CardsPage, {}, {
            animate: true,
            direction: 'forward'
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}