import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GainPage } from './gain';

@NgModule({
  declarations: [
    GainPage,
  ],
  imports: [ 
    IonicPageModule.forChild(GainPage),
  ],
})
export class GainPageModule {}
