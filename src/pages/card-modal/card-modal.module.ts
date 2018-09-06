import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardModalPage } from './card-modal';

@NgModule({
  declarations: [
    CardModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CardModalPage),
  ],
})
export class CardModalPageModule {}
