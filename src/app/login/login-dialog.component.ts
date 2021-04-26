import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {UserService} from "./user.service";
import {SecurityService} from "./security.service";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {UserAuth} from "../model/user-auth";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginDialogForm: FormGroup;
  userAuth: UserAuth = null;

  constructor(private matDialogRef: MatDialogRef<LoginDialogComponent>,
              private fb: FormBuilder, private securityService: SecurityService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginDialogForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });

  }

  login(): void {

    console.log('in save: ' + JSON.stringify(this.loginDialogForm.value));

    // TODO: Validate login data. Might not be needed.
    // this.validateOrderData();

    // TODO: Call securityService login method.
    this.securityService.login(Object.assign(new User(), this.loginDialogForm.value))
      .subscribe(resp => {

          console.log(resp);
          this.userAuth = this.securityService.securityObject;

          if (resp && resp["success"]) {
            this.matDialogRef.close();
            this.router.navigate(['orders']);
          }

        },
        (error: any) => {
          console.log("Error occurred while login: " + error);
          this.userAuth = new UserAuth();
        });

    // TODO: Save data to repo

    // Close the dialog.
    // TODO: send the created order.
    // this.matDialogRef.close(new Order());
    // TODO: Show Snackbar Message

  }

}
