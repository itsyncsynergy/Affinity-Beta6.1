import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VipAccessRequestPage } from './vip-access-request';

@NgModule({
  declarations: [
    VipAccessRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(VipAccessRequestPage),
  ],
})
export class VipAccessRequestPageModule {}
