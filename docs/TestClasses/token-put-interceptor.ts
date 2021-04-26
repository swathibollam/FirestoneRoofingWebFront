import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from "../../src/environments/environment";

@Injectable()
export class TokenPutInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('In TokenPutInterceptor ********************* ');

    var token = localStorage.getItem(environment.bearerTokenName);

    if (token) {

      const newReq = req.clone(
        {
          headers: req.headers.set(environment.authHeaderName,
            'Bearer ' + token)
        });

      return next.handle(newReq);

    }
    else
      return next.handle(req);
    // return next.handle(req);

  }

}
