import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

declare var gapi: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  formLogin: FormGroup;
  hide = true;

  auth2: any;
  @ViewChild('loginRef', {static: true}) loginElement: ElementRef;

  constructor(private authenticationService: AuthenticationService, private router: Router, private zone: NgZone) {
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.googleSDK();
  }

  login(user, pass) {
    this.authenticationService.login(user, pass).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  logout() {
    console.log('logout');
  }

  prepareLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        localStorage.setItem('jav4u_authen',
          JSON.stringify({
            id: profile.getId(),
            name: profile.getName(),
            image: profile.getImageUrl(),
            email: profile.getEmail(),
            token: googleUser.getAuthResponse().id_token
          }));

        this.zone.run(() => {
          this.router.navigate(['/']);
        });
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  googleSDK() {
    window['googleSDKLoaded'] = () => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '924086004375-57q8obkea57eo2k8a1j8mk3p138hj0jf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    };

    // tslint:disable-next-line:only-arrow-functions
    (function(d, s, id) {
      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

}
