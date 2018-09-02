
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { IonicImageLoader } from 'ionic-image-loader';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePage,
    
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(HomePage),
    FormsModule,
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
