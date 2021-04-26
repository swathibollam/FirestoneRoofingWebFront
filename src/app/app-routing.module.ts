import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", loadChildren: "./login/login.module#LoginModule"},
  {path: "profile", loadChildren: "./profile/profile.module#ProfileModule"},
  {path: "orders", loadChildren: "./orders/orders.module#OrdersModule"},
  {path: "demo", loadChildren: "./demo/demo.module#DemoModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
