import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripRequestSettingsPage } from './trip-request-settings';

@NgModule({
  declarations: [
    TripRequestSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripRequestSettingsPage),
  ],
})
export class TripRequestSettingsPageModule {}
