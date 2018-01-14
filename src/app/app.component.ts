import {Component} from '@angular/core';
import {Platform, LoadingController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {OnboardingPage} from '../pages/onboarding/onboarding';
import {ReceiptsPage} from '../pages/receipts/receipts';

import {ResourcesProvider} from '../providers/resources/resources';

@Component({templateUrl: 'app.html'})
export class MyApp {
  cards : any = [];
  rootPage : any;
  loading : any;

  constructor(platform : Platform, statusBar : StatusBar, splashScreen : SplashScreen, public resProvider : ResourcesProvider, public loadCtrl : LoadingController) {

    platform
      .ready()
      .then(() => {
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
            statusBar.styleDefault();
            splashScreen.hide();
          }).catch(() => {
            if (this.cards.length == 0) {
              console.log(this.cards.length);
              this.rootPage = OnboardingPage;
            } else {
              this.rootPage = ReceiptsPage;
            }
          });
      });

  }

}
