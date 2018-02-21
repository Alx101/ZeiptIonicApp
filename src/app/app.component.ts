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
  receipts : any = [];
  rootPage : any;
  loading : any;

  constructor(public resProvider : ResourcesProvider) {}
  ngOnInit() {

    this
      .resProvider
      .loadUser()
      .then((user) => {
        this.user = user;
        if (!this.user) {
          this.rootPage = LoginPage;
        } else {
          this
            .resProvider
            .loadCards()
            .then((cards) => {
              this.cards = cards;

              this
                .resProvider
                .loadReceiptJson()
                .then((receipts) => {
                  this.receipts = receipts
                  if (this.cards.length == 0 && this.receipts.length == 0) {
                    this.rootPage = CardsPage;
                  } else {
                    this.rootPage = ReceiptsPage;
                  }
                })
            })
        }
      })
  }
}
