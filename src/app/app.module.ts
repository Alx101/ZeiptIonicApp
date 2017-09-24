import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { NewCardPage } from '../pages/new-card/new-card';
import { ReceiptsPage } from '../pages/receipts/receipts';
import { ResourcesProvider } from '../providers/resources/resources';
import { YearPopoverPage } from '../pages/year-popover/year-popover';

import { ShrinkingSegmentHeader } from '../components/shrinking-segment-header/shrinking-segment-header';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    NewCardPage,
    ReceiptsPage,
    YearPopoverPage,
    ShrinkingSegmentHeader
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
    NewCardPage,
    ReceiptsPage,
    YearPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResourcesProvider
  ]
})
export class AppModule {}
