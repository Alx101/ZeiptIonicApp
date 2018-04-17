import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {HttpClientModule} from '@angular/common/http';
//import {InterceptorModule} from './interceptor.module';

import {MyApp} from './app.component';
import {CardsPage} from '../pages/cards/cards';
import {LoginPage} from '../pages/login/login';
import {ReceiptsPage} from '../pages/receipts/receipts';
import {OnboardingPage} from '../pages/onboarding/onboarding';
import {ResourcesProvider} from '../providers/resources/resources';
import {ReceiptDetailPage} from "../pages/receipt-detail/receipt-detail";

import {InAppBrowser} from "@ionic-native/in-app-browser";
import {AccordionComponent} from '../components/accordion/accordion';

import {IonicStorageModule} from '@ionic/storage';

import {enableProdMode} from '@angular/core';

enableProdMode();

@NgModule({
    declarations: [
        MyApp,
        CardsPage,
        LoginPage,
        ReceiptsPage,
        OnboardingPage,
        AccordionComponent,
        ReceiptDetailPage
    ],
    imports: [
        BrowserModule, 
        HttpClientModule,
        //InterceptorModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CardsPage,
        LoginPage,
        ReceiptsPage,
        OnboardingPage,
        ReceiptDetailPage
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        ResourcesProvider,
        InAppBrowser
    ]
})
export class AppModule {}