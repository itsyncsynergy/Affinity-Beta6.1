import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileRedemptionPage } from './profile-redemption';

@NgModule({
  declarations: [
    ProfileRedemptionPage,
  ],
  imports: [ 
     
    
    IonicPageModule.forChild(ProfileRedemptionPage),
  ],
})
export class ProfileRedemptionPageModule {}
