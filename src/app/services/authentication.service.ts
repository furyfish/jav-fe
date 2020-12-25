import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfigService} from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl;

  constructor(private http: HttpClient, appConfig: AppConfigService) {
    this.apiUrl = appConfig.apiUrl;
  }

  login(user, pass) {
    const body = {user, pass};
    return this.http.post(`${this.apiUrl}/api/authentication/login`, body);
  }

  logout() {

  }
}
