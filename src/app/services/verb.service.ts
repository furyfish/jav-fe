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
    const masuForm = localStorage.getItem('masuForm');
    const naiForm = localStorage.getItem('naiForm');
    const taForm = localStorage.getItem('taForm');
    const teForm = localStorage.getItem('teForm');
    const potentialForm = localStorage.getItem('potentialForm');
    const passiveForm = localStorage.getItem('passiveForm');

    const params = new HttpParams()
      .set('masuForm', masuForm)
      .set('naiForm', naiForm)
      .set('taForm', taForm)
      .set('teForm', teForm)
      .set('potentialForm', potentialForm)
      .set('passiveForm', passiveForm);

    return this.http.get(`${baseUrl}/random`, {params: params});
  }

}
