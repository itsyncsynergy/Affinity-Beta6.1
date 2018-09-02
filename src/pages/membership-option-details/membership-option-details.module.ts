import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipOptionDetailsPage } from './membership-option-details';

@NgModule({
  declarations: [
    MembershipOptionDetailsPage,
  ],
  imports: [ 
    IonicPageModule.forChild(MembershipOptionDetailsPage),
  ],
})
export class MembershipOptionDetailsPageModule {}
