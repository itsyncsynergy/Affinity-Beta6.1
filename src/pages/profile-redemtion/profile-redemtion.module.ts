import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileRedemtionPage } from './profile-redemtion';

@NgModule({
  declarations: [
    ProfileRedemtionPage,
  ],
  imports: [ 
     
    
    IonicPageModule.forChild(ProfileRedemtionPage),
  ],
})
export class ProfileRedemtionPageModule {}
