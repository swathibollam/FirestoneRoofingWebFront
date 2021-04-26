export class OrderConfirmation {
    confirmed: boolean;
    confirmedAt: Date;
    priorDays: number;
    public toString = () => {
        return `Order confirmation = (${
        "\nConfirmed = " + this.confirmed
        + "\nConfirmed at = " + this.confirmedAt
        + "\nPrior to days = " + this.priorDays
            })`
    }
}
