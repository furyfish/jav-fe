import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfigService} from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  apiUrl;

  constructor(private http: HttpClient, appConfig: AppConfigService) {
    this.apiUrl = appConfig.apiUrl;
  }

  getRandom() {
    this.initForm();
    const params = new HttpParams()
      .set('masuForm', localStorage.getItem('masuForm'))
      .set('naiForm', localStorage.getItem('naiForm'))
      .set('taForm', localStorage.getItem('taForm'))
      .set('teForm', localStorage.getItem('teForm'))
      .set('potentialForm', localStorage.getItem('potentialForm'))
      .set('passiveForm', localStorage.getItem('passiveForm'))
      .set('conditionalForm', localStorage.getItem('conditionalForm'));

    return this.http.get(`${this.apiUrl}/api/verb/random`, {params: params});
  }

  initForm() {
    if (localStorage.getItem('masuForm') == null) {
      localStorage.setItem('masuForm', '1');
      localStorage.setItem('naiForm', '1');
      localStorage.setItem('taForm', '1');
      localStorage.setItem('teForm', '1');
      localStorage.setItem('potentialForm', '1');
      localStorage.setItem('passiveForm', '1');
      localStorage.setItem('conditionalForm', '1');
    }
  }

  loadMaxStreak() {
    if (localStorage.getItem('maxStreak') == null) {
      localStorage.setItem('maxStreak', '0');
    }
    return localStorage.getItem('maxStreak');
  }

}
