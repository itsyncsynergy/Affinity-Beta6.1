import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelicopterRequestPage } from './helicopter-request';

@NgModule({
  declarations: [
    HelicopterRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(HelicopterRequestPage),
  ],
})
export class HelicopterRequestPageModule {}
