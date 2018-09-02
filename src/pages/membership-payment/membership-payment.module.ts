import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipPaymentPage } from './membership-payment';

@NgModule({
  declarations: [
    MembershipPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(MembershipPaymentPage),
  ],
})
export class MembershipPaymentPageModule {}
