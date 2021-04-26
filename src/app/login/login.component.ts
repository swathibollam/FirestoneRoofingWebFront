import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {LoginDialogComponent} from "./login-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private matDialog: MatDialog) {
    this.openLoginDialog();
  }

  ngOnInit() {


  }



  openLoginDialog(): void {

    // TODO: Move dialog configuration out of here into a generic place.
    let mdc: MatDialogConfig = new MatDialogConfig();
    mdc.closeOnNavigation = true;
    mdc.disableClose = true;

    this.matDialog.open(LoginDialogComponent, mdc);

  }

}
