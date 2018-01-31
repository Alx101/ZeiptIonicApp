import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { ReceiptsPage } from '../pages/receipts/receipts';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { ResourcesProvider } from '../providers/resources/resources';
import { ReceiptDetailPage } from "../pages/receipt-detail/receipt-detail";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AccordionComponent } from '../components/accordion/accordion';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    LoginPage,
    ReceiptsPage,
    OnboardingPage,
    AccordionComponent,
    ReceiptDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    LoginPage,
    ReceiptsPage,
    OnboardingPage,
    ReceiptDetailPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResourcesProvider,
    InAppBrowser
  ]
})
export class AppModule {}