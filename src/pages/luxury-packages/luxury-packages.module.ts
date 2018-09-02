import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuxuryPackagesPage } from './luxury-packages';

@NgModule({
  declarations: [
    LuxuryPackagesPage,
  ],
  imports: [
    IonicPageModule.forChild(LuxuryPackagesPage),
  ],
})
export class LuxuryPackagesPageModule {}
