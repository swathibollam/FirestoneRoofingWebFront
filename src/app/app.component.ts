import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";
import {NewOrderComponent} from "./orders/new-order.component";
import {Order} from "./orders/order";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {Utilz} from "./utilz";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';

  /**
   * Constructor with needed dependencies
   * @param {MatDialog} matDialog MatDialog service is used to open NewOrderComponent as a Dialog
   */
  constructor(private matDialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {
  }

  /**
   * Opens the New Order dialog for creation of a new order
   */
  openNewOrderDialog(): void {

    let mdc: MatDialogConfig = new MatDialogConfig();
    // mdc.height = window.innerHeight + 'px';
    // mdc.width = '550px';
    mdc.closeOnNavigation = true;
    mdc.disableClose = true;
    let o: Order = new Order();
    // o.city = "Dhone";
    mdc.data = o;

    const newOrderDialogRef = this.matDialog.open(NewOrderComponent, mdc);

    newOrderDialogRef.afterClosed().subscribe(
      ord => {
        if(ord) { // no need to execute following code if new-order dialog is closed without creating a order.
          console.log('AppComponent: Saved order: ' + ord);

          this.openSnackBar("Order Created successfully.");
          // Reason to send "RandomId" as a parameter is to trigger the reload of "orders" component on "NewOrder" addition.
          // Angular wont load the same page unless there is a change in parameters.
          this.router.navigate(['orders', Utilz.getRandomId()]);
        }
      },
      err => {
        console.error('AppComponent: Error while creating/editing an order: ' + o, err);
      }
    );

  }


  private openSnackBar(message: string, action?: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: environment.snackbarMessageTime
    });
  }
}
