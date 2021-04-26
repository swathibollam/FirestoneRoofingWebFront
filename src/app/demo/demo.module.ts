import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material.module";
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [ButtonsComponent, TableBasicExampleComponent]
})
export class DemoModule { }
