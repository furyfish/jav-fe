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
  dictionary = new FormControl(localStorage.getItem('dictionary') === 'true');
  polite = new FormControl(localStorage.getItem('polite') === 'true');
  tform = new FormControl(localStorage.getItem('tform') === 'true');

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      dictionary: this.dictionary,
      polite: this.polite,
      tform: this.tform
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    localStorage.setItem('dictionary', this.formGroup.get('dictionary').value);
    localStorage.setItem('polite', this.formGroup.get('polite').value);
    localStorage.setItem('tform', this.formGroup.get('tform').value);
  }

}
