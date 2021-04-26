
import {OrderConfirmation} from "./order-confirmation";
import {MaterialType} from "./material-type";
import {OrderType} from "./order-type";

export class Order {

  guid: string;
  purchOrderNum: number;
  salesOrderNum: number;
  userId: string;
  contractorName: string;
  jobName: string;
  materialType: MaterialType; // (insulation, membrane, metal, Skylites)
  productType: string;
  orderType: OrderType; // (Delivery or Pickup)
  orderDate: Date;
  pickupOrDeliverDate: Date;
  city: string;
  addressLine: string;
  addrState: string;
  orderPlaced: boolean = true;
  orderConfirmations: OrderConfirmation[] = [];
  pickedOrDelivered: boolean;
  note?: string;

  // orderStatus: string; // ordered, confirmed 4 days prior, confirmed 1 day prior, shipped
  // shippedDate: Date;
  // orderStatus:string;

  /*public orderStatus():string {

      if (this.pickedOrDelivered)
          return "Shipped";
      else if (!this.orderPlaced)
          return "Not-Ordered";
      else if (this.orderConfirmations.length == 0 && this.orderPlaced)
          return "Ordered";

      return "Confirmed " + this.orderConfirmations[0].priorDays +
          (this.orderConfirmations[0].priorDays > 1 ? "day " : "days " + "prior");

  };*/

  public toString = () => {
    return `Order = (${
    "\nPurchase order number = " + this.purchOrderNum
    + "\nGUID = " + this.guid
    + "\nUserID = " + this.userId
    + "\nContractorName = " + this.contractorName
    + "\nJob name = " + this.jobName
    + "\nMaterial type = " + this.materialType
    + "\nOrder type = " + this.orderType
    + "\nSales Order Number = " + this.salesOrderNum
    + "\nOrder date = " + this.orderDate
    + "\nPickup or Deliver date = " + this.pickupOrDeliverDate
    + "\nCity = " + this.city
    + "\nOrder Placed = " + this.orderPlaced
    + "\nOrder Confirmations = " + this.orderConfirmations
    + "\nOrder Completed = " + this.pickedOrDelivered
    + "\nNote = " + this.note
      })`
  }

}
