import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { RedemptionPage } from './redemption';

@NgModule({
  declarations: [
    RedemptionPage,
  ],
  imports: [ 
    SelectSearchableModule,
    IonicPageModule.forChild(RedemptionPage),
  ],
})
export class RedemptionPageModule {}
