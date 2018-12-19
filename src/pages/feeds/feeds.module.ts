import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedsPage } from './feeds';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    FeedsPage,
  ],
  imports: [ 
    IonicPageModule.forChild(FeedsPage),
  ],
})
export class FeedsPageModule {}
