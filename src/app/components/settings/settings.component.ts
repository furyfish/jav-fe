import {LOCALE_ID, Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formSetting: FormGroup;
  language = localStorage.getItem('language');
  timer = new FormControl(localStorage.getItem('timer') === '1');
  masuForm = new FormControl(localStorage.getItem('masuForm') === '1');
  naiForm = new FormControl(localStorage.getItem('naiForm') === '1');
  taForm = new FormControl(localStorage.getItem('taForm') === '1');
  teForm = new FormControl(localStorage.getItem('teForm') === '1');
  potentialForm = new FormControl(localStorage.getItem('potentialForm') === '1');
  passiveForm = new FormControl(localStorage.getItem('passiveForm') === '1');
  conditionalForm = new FormControl(localStorage.getItem('conditionalForm') === '1');

  constructor(formBuilder: FormBuilder) {
    this.formSetting = formBuilder.group({
      language: this.language,
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
    console.log(localStorage.getItem('language'));
  }

  onFormSubmit() {
    localStorage.setItem('language', this.formSetting.get('language').value);
    localStorage.setItem('timer', this.getSlideValue(this.formSetting.get('timer').value));
    localStorage.setItem('masuForm', this.getSlideValue(this.formSetting.get('masuForm').value));
    localStorage.setItem('naiForm', this.getSlideValue(this.formSetting.get('naiForm').value));
    localStorage.setItem('taForm', this.getSlideValue(this.formSetting.get('taForm').value));
    localStorage.setItem('teForm', this.getSlideValue(this.formSetting.get('teForm').value));
    localStorage.setItem('potentialForm', this.getSlideValue(this.formSetting.get('potentialForm').value));
    localStorage.setItem('passiveForm', this.getSlideValue(this.formSetting.get('passiveForm').value));
    localStorage.setItem('conditionalForm', this.getSlideValue(this.formSetting.get('conditionalForm').value));
  }

  getSlideValue(value) {
    return value === true ? '1' : '0';
  }

}
