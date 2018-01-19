import {Component} from '@angular/core';

import {HomePage} from '../pages/home/home';
import {OnboardingPage} from '../pages/onboarding/onboarding';
import {ReceiptsPage} from '../pages/receipts/receipts';

import {ResourcesProvider} from '../providers/resources/resources';

@Component({templateUrl: 'app.html'})
export class MyApp {
  cards : any = [];
  rootPage : any;
  loading : any;

  constructor(public resProvider : ResourcesProvider) {
    // Okay, so the platform is ready and our plugins are available. Here you can do
    // any higher level native things you might need.
    resProvider
      .loadCards()
      .then((c) => {
        this.cards = c;
        if (this.cards.length == 0) {
          console.log(this.cards.length);
          this.rootPage = OnboardingPage;
        } else {
          this.rootPage = ReceiptsPage;
        }
      })
      .catch(() => {
        if (this.cards.length == 0) {
          console.log(this.cards.length);
          this.rootPage = OnboardingPage;
        } else {
          this.rootPage = ReceiptsPage;
        }
      });
  }
}
