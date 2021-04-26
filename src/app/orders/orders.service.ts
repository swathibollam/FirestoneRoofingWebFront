import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "./order";
import {OrderType} from "./order-type";
import {MaterialType} from "./material-type";
import {User} from "../model/user";
import {Utilz} from "../utilz";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/internal/operators";
import {formatDate} from "@angular/common";

@Injectable()
export class OrdersService {

  private headers = new Headers({'Content-Type': 'application/json'});

  public orders: Array<Order> = [];

  constructor(private httpClient: HttpClient) {
  }

  // getOrders(user: User, startTime: Date, endTime: Date): Promise<Order[]> {
  getAllOrders() {

    // configure httpOptions with headers and params.
    let httpOptions = Object.assign({}, Utilz.httpOptions);

    /* // Adding Parameters
    let params: HttpParams = new HttpParams();
    params = params.set('from', '12/12/2017');
    params = params.set('to', '12/12/2017');
    httpOptions["params"] = params;
    console.log('http options: ' + httpOptions);*/

    return this.httpClient.get<Order[]>(Utilz.getUrl(environment.backendApiAccessProtocol,
      environment.backendServerName, environment.backendServerPort,
      Array.of(environment.backendOrderApiUrl, environment.backendOrderApiGetAllOrders)),
      httpOptions).toPromise()
      .then(os => {

        console.log('service orders: ' + os.length);
        return Promise.resolve(os);

      })
      .catch(reason => {

        console.error('An error occurred while getting orders : ', reason);
        return Promise.reject(reason.message || reason);

      });

  }

  getOrdersInDateRange(fromDate: Date , toDate: Date) {

    console.log('\nIn getOrdersInDateRange, From Date: ' + fromDate + '\nTo Date: ' + toDate);
    // configure httpOptions with headers and params.
    let httpOptions = Object.assign({}, Utilz.httpOptions);

     // Adding Parameters
    let params: HttpParams = new HttpParams();
    params = params.set('from', (fromDate.getMonth()+1) + '/' + fromDate.getDate() + '/' + fromDate.getFullYear());
    params = params.set('to', (toDate.getMonth()+1) + '/' + toDate.getDate() + '/' + toDate.getFullYear());
    httpOptions["params"] = params;
    console.log('http options: ' + httpOptions);

    return this.httpClient.get<Order[]>(Utilz.getUrl(environment.backendApiAccessProtocol,
      environment.backendServerName, environment.backendServerPort,
      Array.of(environment.backendOrderApiUrl, environment.backendOrderApiGetAllOrdersDateRange)),
      httpOptions).toPromise()
      .then(os => {

        console.log('service orders: ' + os.length);
        return Promise.resolve(os);

      })
      .catch(reason => {

        console.error('An error occurred while getting orders : ', reason);
        return Promise.reject(reason.message || reason);

      });

  }

  /**
   * Saves the order to backend.
   * @param {Order} order
   * @returns {Order}
   */
  saveOrder(order: Order): Promise<Order> {

    return this.httpClient.post<Order>(Utilz.getUrl(environment.backendApiAccessProtocol,
      environment.backendServerName, environment.backendServerPort,
      Array.of(environment.backendOrderApiUrl, environment.backendOrderApiAddOrder)),
      order, Utilz.httpOptions).toPromise()
      .then(order => {

        return Promise.resolve(order);

      })
      .catch(reason => {

        console.error('An error occurred while saving order : ' + order, reason);
        return Promise.reject(reason.message || reason);

      });

  }

  private getRandomDate(): Date {

    let dt: Date = new Date();
    dt.setDate(new Date().getDate() + (Math.floor(Math.random() * (7 - 0)) + 0));
    return dt;
  }

  private dummyOrderInitialize() {


    /*this.orders.push({
      purchOrderNum: 12345, salesOrderNum: 2789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Wal-mart', materialType: MaterialType.insulation, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
      orderConfirmations: [], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 12346, salesOrderNum: 3789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Amazon', materialType: MaterialType.membrane, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
      orderConfirmations: [{confirmed: true, priorDays: 1, confirmedAt: new Date()},
        {confirmed: true, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
      , note: 'Some items are not available. Screws, Nails are not in the confirmed order yet.'
    });
    this.orders.push({
      purchOrderNum: 12347,
      salesOrderNum: 4789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Albertsons',
      materialType: MaterialType.skylites,
      orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: false,
      orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 12348, salesOrderNum: 5789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Target', materialType: MaterialType.metal, orderType: OrderType.Pickup, orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
      orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
        {confirmed: true, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 12349, salesOrderNum: 6789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Fred mayers', materialType: MaterialType.membrane, orderType: OrderType.Pickup, orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
      orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 22345, salesOrderNum: 7789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Smiths', materialType: MaterialType.metal, orderType: OrderType.Delivery, orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
      orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
        {confirmed: true, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 22345,
      salesOrderNum: 8789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Family dollar',
      materialType: MaterialType.skylites,
      orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: true,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 22345,
      salesOrderNum: 9789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Cricket wireless',
      materialType: MaterialType.insulation,
      orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: true,
      orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
        {confirmed: true, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 22345,
      salesOrderNum: 10789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Bridgeport retail',
      materialType: MaterialType.insulation,
      orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 32345, salesOrderNum: 100789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Sams club', materialType: MaterialType.metal, orderType: OrderType.Pickup, orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 42345,
      salesOrderNum: 110789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Costco',
      materialType: MaterialType.membrane,
      orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Opsgear', materialType: MaterialType.skylites, orderType: OrderType.Pickup, orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 62345,
      salesOrderNum: 130789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Lees',
      materialType: MaterialType.insulation,
      orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345,
      salesOrderNum: 120789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Dicks sporting',
      materialType: MaterialType.skylites,
      orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345,
      salesOrderNum: 120789,
      userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Macys',
      materialType: MaterialType.skylites,
      orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(),
      city: 'Salt lake',
      orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
      pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'JCPenney', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Belgium chocolates', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Disney', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Johney Rockets', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Great Steak', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Osakiwa', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'McDonalds', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Subway sandwich', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Olive Garden', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'TGI Fridays', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Texas de Brazil', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Verizon Wireless', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'AT & T', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'T-Mobile', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'At Home', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'TJ Maxx', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Home Goods', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Taffy Coffee', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Tillys', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Level 9 Sports', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Interstate Battery', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Handi Quilter', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Apple Station', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Microsoft', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Quallcomm', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Cool Storage', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Rio Grande', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Buca de beppo', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'PF Changs', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Copper Onion', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Cheesecake Factory', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Brio Italian', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Village Bakery', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Goldman sacchs', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'JPMorgan Chase', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Wells Fargo', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Zions bank', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Dixie Waters', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'St George Hospital', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Intermountain Snow', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Brighton resorts', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Alta View Hospital', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Hip & Humble', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Athleta', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Air National Guard', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Southwest', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Jet Fliers', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Yahoo fish', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Walgreens', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Office Deport', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: true
    });
    this.orders.push({
      purchOrderNum: 52345, salesOrderNum: 120789, userId: '10645c4a-cc25-11e7-acdc-96395d26a8d8',
      jobName: 'Lowes', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
      orderDate: new Date(),
      pickupOrDeliverDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
      orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
        {confirmed: false, priorDays: 1, confirmedAt: new Date()}], pickedOrDelivered: false
    });*/
  }


}
