import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../shared/material.module';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {OrdersService} from './orders.service';
import {ReactiveFormsModule} from "@angular/forms";
import {NewOrderComponent} from './new-order.component';
import {LoginModule} from "../login/login.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    OrdersRoutingModule,
    LoginModule,
  ],
  declarations: [OrdersComponent, NewOrderComponent],
  providers: [OrdersService],
})
export class OrdersModule {
}
