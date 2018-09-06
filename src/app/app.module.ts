import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {enableProdMode} from '@angular/core';

import {SuperTabsModule} from 'ionic2-super-tabs';

import {MyApp} from './app.component';
import {ResourcesProvider} from '../providers/resources/resources';

import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {ReceiptDetailPage} from '../pages/receipt-detail/receipt-detail';
import {ExpandableComponent} from '../components/expandable/expandable';
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { SelectSearchableModule } from 'ionic-select-searchable';
import { SendModalPage } from '../pages/send-modal/send-modal';

enableProdMode();

@NgModule({
    declarations: [
        MyApp, LoginPage, HomePage, ReceiptDetailPage, ExpandableComponent, SendModalPage

    ],
    imports: [
        BrowserModule, HttpClientModule, SelectSearchableModule, IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        SuperTabsModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp, LoginPage, HomePage, ReceiptDetailPage, ExpandableComponent, SendModalPage
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        InAppBrowser,
        ResourcesProvider,
        ReceiptDetailPage
    ]
})
export class AppModule {}