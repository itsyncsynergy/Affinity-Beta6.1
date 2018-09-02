import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonateSinglePage } from './donate-single';

@NgModule({
  declarations: [
    DonateSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(DonateSinglePage),
  ],
})
export class DonateSinglePageModule {}
