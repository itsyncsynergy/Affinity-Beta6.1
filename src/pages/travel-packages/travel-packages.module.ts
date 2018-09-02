import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelPackagesPage } from './travel-packages';

@NgModule({
  declarations: [
    TravelPackagesPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelPackagesPage),
  ],
})
export class TravelPackagesPageModule {}
