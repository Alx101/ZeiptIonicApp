import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptsPage } from './receipts';

@NgModule({
  declarations: [
    ReceiptsPage
  ],
  imports: [
    IonicPageModule.forChild(ReceiptsPage)
  ]
})
export class ReceiptsPageModule {}