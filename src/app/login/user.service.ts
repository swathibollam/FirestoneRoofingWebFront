import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Utilz} from "../utilz";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {

  static users: Set<User> = new Set<User>();

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers():Promise<Set<User>> {

    let httpOptions = Object.assign({}, Utilz.httpOptions);

    if (UserService.users.size > 0)
      return Promise.resolve(UserService.users);

    return this.httpClient.get<Set<User>>(Utilz.getUrl(environment.backendApiAccessProtocol,
      environment.backendServerName, environment.backendServerPort,
      Array.of(environment.backendLoginApiUrl, environment.backendLoginApiGetAllUsers)),
      httpOptions).toPromise()
      .then(users => {

        console.log('Users: ' + users);
        UserService.users = new Set<User>(users);

        return Promise.resolve(users);

      })
      .catch(reason => {

        console.error('An error occurred while getting users : ', reason);
        return Promise.reject(reason.message || reason);

      });
  }

  private getTemporaryUser(guid: string, firstName: string, lastName: string,
                           licenseNum: number, dob: Date, username: string,
                           password: string, picUrl: string): User {

    let u = new User();

    u.guid = guid;
    u.firstName = firstName;
    u.lastName = lastName;
    u.dob = dob;
    u.username = username;
    u.password = password;
    u.picUrl = picUrl;

    return u;

  }


  getUsers(): Set<User> {

    if (UserService.users.size > 0)
      return UserService.users;

    UserService.users.add(this.getTemporaryUser('10645c4a-cc25-11e7-acdc-96395d26a8d8', 'Michael', 'Jordan',
      9483336, new Date(1976, 10, 10), 'mjordan', '', ''));
    UserService.users.add(this.getTemporaryUser('36ce3c3e-cc25-11e7-acdc-96395d26a8d8', 'Lebron', 'James',
      9487026, new Date(1976, 10, 15), 'ljames', '', ''));
    UserService.users.add(this.getTemporaryUser('77888298-cc25-11e7-acdc-96395d26a8d8', 'Trisha', 'Yearwood',
      111111, new Date(1976, 10, 20), 'tyearwood', '', ''));


    return UserService.users;

  }
}
