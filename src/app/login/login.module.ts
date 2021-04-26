import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {UserService} from './user.service';
import {MaterialModule} from "../shared/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginDialogComponent} from './login-dialog.component';
import {SecurityService} from "./security.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, LoginDialogComponent],
  providers: [UserService, SecurityService]
})
export class LoginModule {
}
