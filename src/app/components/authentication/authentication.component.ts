import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  hide = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  onAuthenFormSubmit() {
    console.log('login');
  }

}
