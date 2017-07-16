import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ExpandableComponent } from './expandable';

@NgModule({
  declarations: [
    ExpandableComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ExpandableComponent
  ]
})
export class ExpandableComponentModule {}
