import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremiumMemberPage } from './premium-member';

@NgModule({
  declarations: [
    PremiumMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(PremiumMemberPage),
  ],
})
export class PremiumMemberPageModule {}
