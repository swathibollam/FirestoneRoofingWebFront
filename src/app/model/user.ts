export class User {

  guid: string; // Universally unique ID
  firstName: string;
  lastName: string;
  licenseNum: number;
  dob: Date;
  username: string;
  password: string;
  picUrl: string;

  constructor() {}

  public toString = () => {
    return `User = (${
    "\nUUID = " + this.guid
    + "\nUser FirstName = " + this.firstName
    + "\nLastName # = " + this.lastName
    + "\nLicense num = " + this.licenseNum
    + "\nUsername = " + this.username
    + "\nPassword = " + this.password
    + "\nDOB = " + this.dob
    + "\nPic url = " + this.picUrl
      })`
  }

}
