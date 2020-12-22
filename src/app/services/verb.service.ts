import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

const baseUrl = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private http: HttpClient) {
  }

  getRandom() {
    this.initForm();
    // console.log('href|' + window.location.href);
    // console.log('host|' + window.location.host);
    // console.log('hostname|' + window.location.hostname);
    // console.log('origin|' + window.location.origin);
    // console.log('pathname|' + window.location.pathname);
    // console.log('port|' + window.location.port);
    // console.log('protocol|' + window.location.protocol);
    const params = new HttpParams()
      .set('masuForm', localStorage.getItem('masuForm'))
      .set('naiForm', localStorage.getItem('naiForm'))
      .set('taForm', localStorage.getItem('taForm'))
      .set('teForm', localStorage.getItem('teForm'))
      .set('potentialForm', localStorage.getItem('potentialForm'))
      .set('passiveForm', localStorage.getItem('passiveForm'))
      .set('conditionalForm', localStorage.getItem('conditionalForm'));

    return this.http.get(`${baseUrl}/api/verb/random`, {params: params});
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
