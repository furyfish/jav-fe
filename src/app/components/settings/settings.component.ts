import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formGroup: FormGroup;
  language = 'vi';
  masuForm = new FormControl(localStorage.getItem('masuForm') === '1');
  naiForm = new FormControl(localStorage.getItem('naiForm') === '1');
  taForm = new FormControl(localStorage.getItem('taForm') === '1');
  teForm = new FormControl(localStorage.getItem('teForm') === '1');

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      masuForm: this.masuForm,
      naiForm: this.naiForm,
      taForm: this.taForm,
      teForm: this.teForm
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    localStorage.setItem('masuForm', this.getSlideValue(this.formGroup.get('masuForm').value));
    localStorage.setItem('naiForm', this.getSlideValue(this.formGroup.get('naiForm').value));
    localStorage.setItem('taForm', this.getSlideValue(this.formGroup.get('taForm').value));
    localStorage.setItem('teForm', this.getSlideValue(this.formGroup.get('teForm').value));
  }

  getSlideValue(value) {
    return value === true ? '1' : '0';
  }

}
