import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { SelectSearchableModule } from 'ionic-select-searchable';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    SelectSearchableModule
  ],
})
export class ProfilePageModule {}
