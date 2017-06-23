import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCardPage } from './new-card';

@NgModule({
  declarations: [
    NewCardPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCardPage),
  ],
  exports: [
    NewCardPage
  ]
})
export class NewCardPageModule {}
