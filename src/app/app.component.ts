import {Component} from '@angular/core';
import {LoginPage} from '../pages/login/login';
import {OnboardingPage} from '../pages/onboarding/onboarding';
import {ReceiptsPage} from '../pages/receipts/receipts';
import {CardsPage} from '../pages/cards/cards';

import {ResourcesProvider} from '../providers/resources/resources';

@Component({templateUrl: 'app.html'})
export class MyApp {
    
    rootPage : any;
    loading : any;

    constructor(public resProvider : ResourcesProvider) {}
    ngOnInit() {

        this
            .resProvider
            .loadUser()
            .then((user : any) => {
                if (user.token == "") {
                    this.rootPage = LoginPage;
                } else {
                    this
                        .resProvider
                        .loadCards()
                        .then((cards : any) => {
                            console.log('cards::', cards);
                            this
                                .resProvider
                                .loadReceiptJson()
                                .then((receipts : any) => {
                                    console.log("receipts::", receipts)
                                    
                                    if (!cards.length && !receipts.length) {
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
