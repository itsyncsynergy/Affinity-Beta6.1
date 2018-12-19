import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventTicketsPage } from './event-tickets';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    EventTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventTicketsPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventTicketsPageModule {}
