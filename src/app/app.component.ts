import {Component} from '@angular/core';

import {LoginPage} from '../pages/login/login';
import {OnboardingPage} from '../pages/onboarding/onboarding';
import {ReceiptsPage} from '../pages/receipts/receipts';

import {ResourcesProvider} from '../providers/resources/resources';

@Component({templateUrl: 'app.html'})
export class MyApp {
  user : any;
  rootPage : any;
  loading : any;

  constructor(public resProvider : ResourcesProvider) {
    resProvider
      .loadUser()
      .then((user) => {
        if (user) {
          this.rootPage = OnboardingPage; 
        } else {
          this.rootPage = LoginPage;
        }
      }).catch((err) => {
        this.rootPage = LoginPage;
      })
  }
}
