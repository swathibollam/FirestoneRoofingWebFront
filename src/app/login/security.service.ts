import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuth} from "../model/user-auth";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {Observable, pipe} from "rxjs/index";
import {tap} from "rxjs/internal/operators";
import {Utilz} from "../utilz";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SecurityService {

  securityObject: UserAuth = new UserAuth();

  constructor(private httpClient: HttpClient) {
  }

  login(creds: User): Observable<UserAuth> {

    this.resetSecurityObject();

    // this.httpClient.get("http://localhost:8080/login/hello").toPromise().then(res => console.log("response: " + res));

    return this.httpClient.post<UserAuth>(Utilz.getUrl(environment.backendApiAccessProtocol,
      environment.backendServerName, environment.backendServerPort,
      Array.of(environment.backendLoginApiUrl, environment.backendLoginApiSignIn)),
      creds, httpOptions).pipe(tap((res => {

      console.log("*********** Response from login service: " + res);
      if (res && res["success"]) {
        this.securityObject.isAuthenticated = res["success"];
        localStorage.setItem(environment.bearerTokenName, res["tok"]);
      }

    })));

  }

  logout(): void {
    this.resetSecurityObject();
    localStorage.removeItem(environment.bearerTokenName);
  }

  resetSecurityObject(): void {

    this.securityObject.role = "";
    this.securityObject.isAuthenticated = false;

    localStorage.removeItem(environment.bearerTokenName);

  }

}
