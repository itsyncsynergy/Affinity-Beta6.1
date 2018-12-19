import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantRedeemPage } from './merchant-redeem';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    MerchantRedeemPage,
  ],
  imports: [
    SelectSearchableModule,
    IonicPageModule.forChild(MerchantRedeemPage),
  ],
})
export class MerchantRedeemPageModule {}
