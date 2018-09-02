import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from './activity';

@NgModule({
  declarations: [
    ActivityPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ActivityPage),
  ],
})
export class ActivityPageModule {}
