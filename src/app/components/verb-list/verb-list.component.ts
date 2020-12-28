import {LOCALE_ID, Component, HostListener, OnInit, ViewChild, Inject} from '@angular/core';
import {VerbService} from '../../services/verb.service';
import * as wanakana from 'wanakana';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})
export class VerbListComponent implements OnInit {

  verb: any = {form: {}, tense: {}, type: {}, furigana: ''};
  currentStreak = '0';
  maxStreak = '0';
  kana = '';
  pointClass = 'hidden-point';
  lastInput = '';
  useProgressbar = localStorage.getItem('timer') === '1';
  @ViewChild('inputResult') inputResult: MatInput;
  isReviewing = false;
  none = 'N/A';

  constructor(private verbService: VerbService) {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.isReviewing) {
      this.refreshList();
      this.focusInputResult();
    }
  }

  ngOnInit() {
    this.verb = {form: {}, tense: {}, type: {}, furigana: ''};
    this.refreshList();
  }

  retrieveOneVerb() {
    this.verbService.getRandom()
      .subscribe(
        data => {
          this.verb = data;
          console.log(this.verb);
          if (this.hasValue(this.verb.code) && this.verb.code === 1) {
            const furigana = [];
            let lastFuriganaIdx = 0;
            for (let i = 0; i < this.verb.furigana.length; i++) {
              if (this.verb.furigana.charAt(i) === ']') {
                furigana.push(this.verb.furigana.slice(lastFuriganaIdx, i + 1));
                lastFuriganaIdx = i + 1;
              }
            }
            let countKanji = 0;
            let idxJisho = 0;
            this.verb.jisho = this.verb.kanji;
            for (let i = 0; i < this.verb.kanji.length; i++) {
              if (wanakana.isKanji(this.verb.kanji.charAt(i))) {
                this.verb.jisho = this.insert(this.verb.jisho, idxJisho + 1, furigana[countKanji]);
                countKanji += 1;
                idxJisho += 3;
              }
              idxJisho++;
            }
            console.log(this.verb);
          }
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    setTimeout(() => this.isReviewing = false, 500);
    this.hideCorrect();
    this.showInputResult();
    this.showProgress();
    this.retrieveOneVerb();
    this.maxStreak = this.verbService.loadMaxStreak();
    if (this.useProgressbar) {
      this.createProgressbar('progressbar', '10s', () => {
        this.compareInputResult(this.kana);
      });
    }
    this.kana = '';
    this.focusInputResult();
  }

  compareInputResult(inputValue) {
    if (inputValue === this.verb.result1 || inputValue === this.verb.result2) {
      this.currentStreak = String(Number(this.currentStreak) + 1);
      if (this.currentStreak > this.maxStreak) {
        this.maxStreak = String(Number(this.maxStreak) + 1);
      }
      if (Number(this.maxStreak) > Number(localStorage.getItem('maxStreak'))) {
        localStorage.setItem('maxStreak', this.maxStreak);
      }
      this.showPoint();
      if (this.useProgressbar) {
        this.removeProgressbar('progressbar');
        setTimeout(() => this.refreshList(), 1000);
      } else {
        this.refreshList();
      }
    } else {
      setTimeout(() => this.isReviewing = true, 500);
      this.showCorrect();
      this.hideInputResult();
      this.hideProgress();
      this.lastInput = inputValue;
      this.currentStreak = '0';
    }
  }

  focusInputResult() {
    if (this.inputResult != null) {
      this.inputResult.focus();
    }
  }

  showCorrect() {
    const correct = document.getElementById('correct');
    correct.style.display = 'block';
  }

  hideCorrect() {
    const correct = document.getElementById('correct');
    correct.style.display = 'none';
  }

  showInputResult() {
    const correct = document.getElementById('input-field');
    correct.style.display = 'grid';
  }

  hideInputResult() {
    const correct = document.getElementById('input-field');
    correct.style.display = 'none';
  }

  showProgress() {
    const progress = document.getElementById('progressbar');
    progress.style.display = 'block';
  }

  hideProgress() {
    const progress = document.getElementById('progressbar');
    progress.style.display = 'none';
  }

  showPoint() {
    this.pointClass = 'showup-point';
    setTimeout(() => {
      this.pointClass = 'hidden-point';
    }, 1001);
  }

  convertRomajiToKana(romaji) {
    const iKana = wanakana.toKana(romaji, {customKanaMapping: {nn: 'ん', n: 'n'}});
    this.kana = iKana;
    return iKana;
  }

  insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }

  checkTense() {
    return this.verb !== '' && this.verb.tense !== undefined && this.verb.tense !== '';
  }

  checkType() {
    return this.verb !== '' && this.verb.type !== undefined && this.verb.type !== '';
  }

  createProgressbar(id, duration, callback) {
    const progressbar = document.getElementById(id);
    progressbar.classList.remove('progressbar');
    progressbar.classList.add('progressbar');

    let progressbarinner = document.getElementById('inner');
    if (progressbarinner == null) {
      // We create the div that changes width to show progress
      progressbarinner = document.createElement('div');
      progressbarinner.id = 'inner';
      progressbarinner.classList.add('inner');

      // Now we set the animation parameters
      progressbarinner.style.animationDuration = duration;

      // Eventually couple a callback
      if (typeof (callback) === 'function') {
        progressbarinner.addEventListener('animationend', callback);
      }

      // Append the progressbar to the main progressbardiv
      progressbar.appendChild(progressbarinner);
    }

    // When everything is set up we start the animation
    progressbarinner.style.animationPlayState = 'running';
  }

  removeProgressbar(id) {
    const progressbar = document.getElementById(id);
    progressbar.classList.remove('progressbar');
    progressbar.innerHTML = '';
  }

  hasValue(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
  }
}
