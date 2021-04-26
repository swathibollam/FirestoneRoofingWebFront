import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from "../environments/environment";

@Injectable()
export class TokenPutInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('************** Hello from interceptor: ' + req.url);

    var token = localStorage.getItem(environment.bearerTokenName);

    if (token) {

      console.log('token exists: ' + token);

      /*const newReq = req.clone(
        {
          headers: req.headers.set("authorization", token)
        });*/
      const newReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });

      console.log('headers keys: ' + newReq.headers.keys());
      console.log('headers authorization: ' + newReq.headers.get("authorization"));
      return next.handle(newReq);

    }
    else {
      console.log('Token does not exist yet');
      return next.handle(req);
    }

  }
}
