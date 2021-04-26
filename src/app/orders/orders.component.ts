/*import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
  }

  /!**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   *!/
  ngAfterViewInit() {

    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

/!** Builds and returns a new User. *!/
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}


/!** Constants used to fill up our data base. *!/
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/!** An example database that the data source uses to retrieve data for the table. *!/
export class ExampleHttpDao {
  constructor(private http: HttpClient) {
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}*/

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatPaginator,
  MatSnackBar, MatSnackBarRef,
  MatSort,
  MatTableDataSource, SimpleSnackBar
} from "@angular/material";
import {Order} from "./order";
import {OrdersService} from "./orders.service";
import {OrderType} from "./order-type";
import {environment} from "../../environments/environment";
import {NewOrderComponent} from "./new-order.component";
import {UserService} from "../login/user.service";
import {User} from "../model/user";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {filter} from "rxjs/internal/operators";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  displayedColumns = ['purchaseOrderNum', 'salesOrderNum', 'jobName', 'materialType', 'orderType', 'Contractor',
    'pickDeliverDt', 'addrState', 'orderStatus', 'note'];
  dataSource: MatTableDataSource<Order>;
  users: Set<User>;
  orders: Order[] = [];
  userMap: Map<string, User> = new Map<string, User>();
  errorMessage: string;
  // for pickupOrDeliverydate dateRange filter
  fromDate = new FormControl();
  toDate = new FormControl();
  filterTextValue: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private olService: OrdersService,
              private uService: UserService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
    // Reason for "mysticId" usage as a parameter is to trigger the reload of "orders" component on "NewOrder" addition.
    // Angular wont load the same page unless there is a change in parameters.
    console.log('param: ' + this.route.snapshot.paramMap.get('mysticId'));
  }

  ngOnInit() {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

    this.uService.getAllUsers()
      .then(users => {

        this.users = users;

        this.users.forEach(u => this.userMap.set(u.guid, u));

        this.getOrders();

      })
      .catch(err => {
        this.errorMessage = 'Orders.component: Error occurred while getting all users: ' + err;
      });

  }

  openEditOrderDialog(o: Order): void {

    // TODO: Move dialog configuration out of here into a generic place.
    let mdc: MatDialogConfig = new MatDialogConfig();
    mdc.closeOnNavigation = true;
    mdc.disableClose = true;
    o.orderDate = new Date(o.orderDate);
    o.pickupOrDeliverDate = new Date(o.pickupOrDeliverDate);
    mdc.data = o;

    const newOrderDialogRef = this.matDialog.open(NewOrderComponent, mdc);

    newOrderDialogRef.afterClosed().subscribe(
      ord => {
        console.log('Saved order: ' + ord);
        if (ord) {
          // find order in this.orders and replace it with saved order.
          this.updateOrderInList(ord);
          this.dataSource = new MatTableDataSource<Order>(this.orders);
          this.openSnackBar("Order updated successfully.");
        }
      },
      err => {
        console.error('Error while creating/editing an order: ' + o, err);
        this.errorMessage = 'Orders.component: Error occurred while closing of Dialog Order: ' + err;
      }
    );


  }

  getOrderStatus(order: Order): string {

    if (order.pickedOrDelivered) {
      return order.orderType === OrderType.Pickup ? environment.OrderPickedUp : environment.OrderDelivered;
    }
    else if (!order.orderPlaced)
      return environment.OrderNotOrdered;
    else if (order.orderConfirmations.length === 0 && order.orderPlaced)
      return environment.OrderOrdered;

    let confirms = "";
    order.orderConfirmations.forEach(
      oc => {
        if (oc.confirmed)
          confirms += oc.priorDays + ",";
      }
    );
    if (confirms.length > 0)
      confirms = confirms.slice(0, -1); // -1 means strLength-1. Extraction stops right before endIndex
    return "Confirmed " + confirms +
      (order.orderConfirmations[0].priorDays > 1 ? " days" : " day") + " prior";

  };

  dateRangeUpdate() {
    console.log('\nFrom: ' + this.fromDate.value + '\nTo: ' + this.toDate.value);
    if (this.fromDate.value && this.toDate.value) {
      console.log('both values chosen');
      /*let filtered: Order[] = this.orders.filter((o) => {
        return o.pickupOrDeliverDate >= (new Date(this.fromDate.value))
          && o.pickupOrDeliverDate <= (new Date(this.toDate.value));
      });*/
      this.olService.getOrdersInDateRange(new Date(this.fromDate.value), new Date(this.toDate.value))
        .then((ords: Order[]) => {

          this.orders = ords;
          this.populateContractorNameInOrders();
          console.log('# orders in return: ' + this.orders.length);
          this.dataSource = new MatTableDataSource(this.orders);
          this.applyFilter(this.filterTextValue);

        })
        .catch(err => {
          this.errorMessage = 'Orders.component: Error occurred while getting orders in date range: ' + err;
        });

    }
    else {
      // Clear the date filter on datasource and refresh the table.
      /*this.dataSource = new MatTableDataSource(this.orders);
      this.applyFilter(this.filterTextValue);*/
      this.getOrders();
    }
  }

  private openSnackBar(message: string, action?: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: environment.snackbarMessageTime
    });
  }


  private getOrders() {
    this.olService.getAllOrders()
      .then((ords: Order[]) => {

        this.orders = ords;
        this.populateContractorNameInOrders();
        console.log('# orders in return: ' + this.orders.length);
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.applyFilter(this.filterTextValue);

      })
      .catch(err => {
        this.errorMessage = 'Orders.component: Error occurred while getting all orders: ' + err;
      });
  }

  private populateContractorNameInOrders() {
    this.orders = this.orders.map((o) => {
      o.contractorName = this.getContractorName(o.userId);
      return o;
    });
  }

  getContractorName(userGuid: string): string {

    let u: User = this.userMap.get(userGuid) as User;

    return u.firstName + " " + u.lastName;

  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.filterTextValue = filterValue;
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }


  private updateOrderInList(order: Order) {
    let index = this.orders.findIndex((o) => o.guid === order.guid);
    this.orders.splice(index, 1, order); // Replaces 1 element at the index
  }
}
