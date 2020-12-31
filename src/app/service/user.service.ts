import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models/user';

const serviceEndpoint = environment.apiEndpoint + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  readUser(username: string): Promise<User> {
    return this.httpClient.get<User>(serviceEndpoint + '/' + username).toPromise();
  }
}
