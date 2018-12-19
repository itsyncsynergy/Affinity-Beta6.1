import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventTicketRequestPage } from './event-ticket-request';

@NgModule({
  declarations: [
    EventTicketRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(EventTicketRequestPage),
  ],
})
export class EventTicketRequestPageModule {}
