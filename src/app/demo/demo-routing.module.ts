import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ButtonsComponent} from "./buttons/buttons.component";
import {TableBasicExampleComponent} from "./table-basic-example/table-basic-example.component";

const routes: Routes = [
  {path: 'buttons', component: ButtonsComponent},
  {path: 'tablebasic', component: TableBasicExampleComponent},
  {path: '**', redirectTo: 'buttons'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule {
}
