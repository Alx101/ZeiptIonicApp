import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {enableProdMode} from '@angular/core';

import {SuperTabsModule} from 'ionic2-super-tabs';

import {MyApp} from './app.component';
import {ResourcesProvider} from '../providers/resources/resources';

import {ScanPage} from '../pages/scan/scan';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {ReceiptDetailPage} from '../pages/receipt-detail/receipt-detail';
import {AccordionComponent} from '../components/accordion/accordion';

import {ngIntlTelInput} from 'ng-intl-tel-input'
import {Ng2TelInputModule} from 'ng2-tel-input';

enableProdMode();

@NgModule({
    declarations: [
        MyApp, LoginPage, HomePage, ReceiptDetailPage, AccordionComponent

    ],
    imports: [
        BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        SuperTabsModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp, LoginPage, HomePage, ReceiptDetailPage, AccordionComponent
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        ResourcesProvider,
        ReceiptDetailPage
    ]
})
export class AppModule {}