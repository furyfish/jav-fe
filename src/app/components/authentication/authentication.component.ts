import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  formLogin: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
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

}
