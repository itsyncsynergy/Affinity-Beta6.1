import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileInterestPage } from './profile-interest';

@NgModule({
  declarations: [
    ProfileInterestPage,
  ],
  imports: [ 
     
    
    IonicPageModule.forChild(ProfileInterestPage),
  ],
})
export class ProfileInterestPageModule {}
