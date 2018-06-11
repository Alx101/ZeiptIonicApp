import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SuperTabsModule } from 'ionic2-super-tabs';
 
@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SuperTabsModule
  ],
})
export class HomePageModule {}