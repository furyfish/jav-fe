import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formGroup: FormGroup;
  language = 'vi';
  timer = new FormControl(localStorage.getItem('timer') === '1');
  masuForm = new FormControl(localStorage.getItem('masuForm') === '1');
  naiForm = new FormControl(localStorage.getItem('naiForm') === '1');
  taForm = new FormControl(localStorage.getItem('taForm') === '1');
  teForm = new FormControl(localStorage.getItem('teForm') === '1');
  potentialForm = new FormControl(localStorage.getItem('potentialForm') === '1');
  passiveForm = new FormControl(localStorage.getItem('passiveForm') === '1');
  conditionalForm = new FormControl(localStorage.getItem('conditionalForm') === '1');

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      timer: this.timer,
      masuForm: this.masuForm,
      naiForm: this.naiForm,
      taForm: this.taForm,
      teForm: this.teForm,
      potentialForm: this.potentialForm,
      passiveForm: this.passiveForm,
      conditionalForm: this.conditionalForm,
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    localStorage.setItem('timer', this.getSlideValue(this.formGroup.get('timer').value));
    localStorage.setItem('masuForm', this.getSlideValue(this.formGroup.get('masuForm').value));
    localStorage.setItem('naiForm', this.getSlideValue(this.formGroup.get('naiForm').value));
    localStorage.setItem('taForm', this.getSlideValue(this.formGroup.get('taForm').value));
    localStorage.setItem('teForm', this.getSlideValue(this.formGroup.get('teForm').value));
    localStorage.setItem('potentialForm', this.getSlideValue(this.formGroup.get('potentialForm').value));
    localStorage.setItem('passiveForm', this.getSlideValue(this.formGroup.get('passiveForm').value));
    localStorage.setItem('conditionalForm', this.getSlideValue(this.formGroup.get('conditionalForm').value));
  }

  getSlideValue(value) {
    return value === true ? '1' : '0';
  }

}
