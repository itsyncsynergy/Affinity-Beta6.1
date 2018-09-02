import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerSinglePage } from './volunteer-single';

@NgModule({
  declarations: [
    VolunteerSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerSinglePage),
  ],
})
export class VolunteerSinglePageModule {}
