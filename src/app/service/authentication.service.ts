import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Token } from '@app/models/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const serviceEndpoint = environment.apiEndpoint + '/auth/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #tokenFetchedAt: Date | undefined;
  #token: Token | undefined;

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Promise<void> {

    const jsonBody = '{"username":"' + username + '", "password":"' + password + '"}';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return new Promise<void>((resolve, reject) => {
      console.debug('Attempting authentication ...');
      this.httpClient.post<Token>(serviceEndpoint + '/authenticate', jsonBody, {headers})
        .subscribe(
          data => {
            this.#tokenFetchedAt = new Date();
            this.#token = data;
            console.debug('... SUCCESS - Successfully fetched a token object from the api.');
            resolve();
          },
          error => {
            console.debug('... FAILURE - Failure during authentication.');
            reject(error);
          });
    });
  }

  logout(): void {
    this.#tokenFetchedAt = undefined;
    this.#token = undefined;
  }

  isAuthenticated(): boolean {
    return this.#token !== undefined;
  }
}
