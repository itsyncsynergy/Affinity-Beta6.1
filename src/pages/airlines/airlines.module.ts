import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirlinesPage } from './airlines';

@NgModule({
  declarations: [
    AirlinesPage,
  ],
  imports: [
    IonicPageModule.forChild(AirlinesPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AirlinesPageModule {}
