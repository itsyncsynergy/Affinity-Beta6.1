import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileActivitiesPage } from './profile-activities';

@NgModule({
  declarations: [
    ProfileActivitiesPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ProfileActivitiesPage),
  ],
})
export class ProfileActivitiesPageModule {}
