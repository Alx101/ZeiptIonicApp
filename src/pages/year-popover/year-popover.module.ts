import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YearPopoverPage } from './year-popover';

@NgModule({
  declarations: [
    YearPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(YearPopoverPage),
  ],
})
export class YearPopoverPageModule {}
