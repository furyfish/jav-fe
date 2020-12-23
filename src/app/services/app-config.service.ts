import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  apiUrl: string;

  constructor(private http: HttpClient) {
  }

  ensureInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/config/config.json')
        .subscribe(
          (content: AppConfigService) => {
            Object.assign(this, content);
            resolve(this);
          },
          reason => reject(reason));
    });
  }
}
