import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

const baseUrl = 'http://localhost:8081/api/verb';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private http: HttpClient) {
  }

  getRandom() {
    const dictionary = localStorage.getItem('dictionary');
    const polite = localStorage.getItem('polite');
    const tform = localStorage.getItem('tform');

    const params = new HttpParams().set('dictionary', dictionary).set('polite', polite).set('tform', tform);

    return this.http.get(`${baseUrl}/random`, {params: params});
  }

}
