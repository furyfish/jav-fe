import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// const baseUrl = 'http://localhost:8081/api/verb';
const baseUrl = 'http://35.247.142.242:8081/api/verb';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private http: HttpClient) {
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

    return this.http.get(`${baseUrl}/random`, {params: params});
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
