import {Component} from '@angular/core';

import {LoginPage} from '../pages/login/login';
import {OnboardingPage} from '../pages/onboarding/onboarding';
import {ReceiptsPage} from '../pages/receipts/receipts';
import {CardsPage} from '../pages/cards/cards';

import {ResourcesProvider} from '../providers/resources/resources';

@Component({templateUrl: 'app.html'})
export class MyApp {
  user : any;
  cards : any = [];
  rootPage : any;
  loading : any;

  constructor(public resProvider : ResourcesProvider) {}
  ngOnInit() {
    this
      .resProvider
      .loadUser()
      .then((user) => {
        this.user = user;
        this
          .resProvider
          .loadCards()
          .then((c) => {
            this.cards = c;
            if (this.user && (this.cards.length > 0)) {
              this.rootPage = ReceiptsPage;
            } else if (this.user && (this.cards.length == 0)) {
              this.rootPage = OnboardingPage;
            } else {
              this.rootPage = LoginPage;
            }
          })
      })
  }

}
