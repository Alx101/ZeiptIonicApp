import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from './password-validation';
import {OnboardingPage} from '../onboarding/onboarding';

@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {

  user : any = {};
  registerUserView : boolean = false;
  loginUserView : boolean = false;

  registerForm : FormGroup;
  loginForm : FormGroup;

  submitAttempt : boolean = false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public formBuilder : FormBuilder) {

    this.loginForm = formBuilder.group({
      username: [
        '', Validators.compose([
          Validators.pattern(this.emailPattern),
          Validators.required
        ])
      ],
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
          .navCtrl
          .setRoot(OnboardingPage, {}, {
            animate: true,
            direction: 'forward'
          });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  registerUser() {
    this
      .resProvider
      .registerUser(this.registerForm.value.username)
      .then(data => {
        this.user = data;
        this
          .navCtrl
          .setRoot(OnboardingPage, {}, {
            animate: true,
            direction: 'forward'
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}