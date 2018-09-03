import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalListPage } from './rental-list';

@NgModule({
  declarations: [
    RentalListPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalListPage),
  ],
})
export class RentalListPageModule {}
