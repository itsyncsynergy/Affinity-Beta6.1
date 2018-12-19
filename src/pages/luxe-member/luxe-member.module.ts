import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuxeMemberPage } from './luxe-member';

@NgModule({
  declarations: [
    LuxeMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(LuxeMemberPage),
  ],
})
export class LuxeMemberPageModule {}
