import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./orders.component";

const routes: Routes = [
  {path: "", component: OrdersComponent},
  {path: "orders/:mysticId", component: OrdersComponent}
];

// Reason for "mysticId" usage as a parameter is to trigger the reload of "orders" component on "NewOrder" addition.
// Angular wont load the same page unless there is a change in parameters.

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
