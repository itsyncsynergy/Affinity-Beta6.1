import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsTicketsCategoriesPage } from './events-tickets-categories';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    EventsTicketsCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsTicketsCategoriesPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsTicketsCategoriesPageModule {}
