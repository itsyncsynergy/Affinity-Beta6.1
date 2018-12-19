import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EssenceMemberPage } from './essence-member';

@NgModule({
  declarations: [
    EssenceMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(EssenceMemberPage),
  ],
})
export class EssenceMemberPageModule {}
