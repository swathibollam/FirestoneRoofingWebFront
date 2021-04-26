import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NewOrderComponent} from "./orders/new-order.component";
import {OrdersModule} from "./orders/orders.module";
import {MaterialModule} from "./shared/material.module";
import {LoginModule} from "./login/login.module";
import {LoginDialogComponent} from "./login/login-dialog.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenPutInterceptorService} from "./token-put-interceptor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    OrdersModule,
    LoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenPutInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewOrderComponent, LoginDialogComponent],
})
export class AppModule {
}
