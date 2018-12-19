import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipCardPage } from './membership-card';

@NgModule({
  declarations: [
    MembershipCardPage,
  ],
  imports: [
    IonicPageModule.forChild(MembershipCardPage),
  ],
})
export class MembershipCardPageModule {}
