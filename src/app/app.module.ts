import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ReceiptsPage } from '../pages/receipts/receipts';
import { ResourcesProvider } from '../providers/resources/resources';
import { ReceiptDetailPage } from "../pages/receipt-detail/receipt-detail";

import { ShrinkingSegmentHeader } from '../components/shrinking-segment-header/shrinking-segment-header';
import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    ReceiptsPage,
    ShrinkingSegmentHeader,
    ReceiptDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    ReceiptsPage,
    ReceiptDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResourcesProvider,
    InAppBrowser
  ]
})
export class AppModule {}
