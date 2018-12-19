import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalWardrobePage } from './personal-wardrobe';

@NgModule({
  declarations: [
    PersonalWardrobePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalWardrobePage),
  ],
})
export class PersonalWardrobePageModule {}
