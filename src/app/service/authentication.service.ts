import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Token } from '@app/models/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const userdataCookie = 'USERDATA';
const serviceEndpoint = environment.apiEndpoint + '/auth/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated: Observable<boolean> = new Observable<boolean>(observer => observer.next(this.isAuthenticated()));

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }

  authenticate(username: string, password: string): Promise<void> {

    const jsonBody = '{"username":"' + username + '", "password":"' + password + '"}';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return new Promise<void>((resolve, reject) => {
      console.debug('Attempting authentication ...');
      this.httpClient.post<Token>(serviceEndpoint + '/authenticate', jsonBody, {headers})
        .subscribe(
          data => {
            console.debug('... SUCCESS - Successfully authenticated.');
            resolve();
          },
          error => {
            console.debug('... FAILURE - Failure during authentication.');
            reject(error);
          });
    });
  }

  logout(): void {
    this.httpClient.post<Token>(serviceEndpoint + '/logout', null).subscribe();
  }

  isAuthenticated(): boolean {
    return this.cookieService.check(userdataCookie);
  }

  getToken(): Token {
    const encodedUserData = this.cookieService.get(userdataCookie);
    const decodedUserData = atob(encodedUserData);
    const parsedUserData = JSON.parse(decodedUserData);
    return new Token(parsedUserData.sub, parsedUserData.permissions);
  }
}
