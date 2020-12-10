import {Component, OnInit} from '@angular/core';
import {VerbService} from 'src/app/services/verb.service';
import * as wanakana from 'wanakana';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})
export class VerbListComponent implements OnInit {

  verb: any;
  currentStreak = '0';
  maxStreak = '0';
  kana = '';
  pointClass = 'hidden-point';
  input = '';
  disabledResult = false;

  constructor(private verbService: VerbService) {
  }

  ngOnInit() {
    if (localStorage.getItem('maxStreak') == null) {
      localStorage.setItem('maxStreak', '0');
    }
    this.maxStreak = localStorage.getItem('maxStreak');
    this.hideCorrect();
    this.retrieveOneVerb();
  }

  retrieveOneVerb() {
    this.verbService.getRandom()
      .subscribe(
        data => {
          this.verb = data;
          console.log(this.verb);
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
            console.log(this.verb.jisho);
          }
          console.log(this.verb);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.hideCorrect();
    this.retrieveOneVerb();
    this.kana = '';
  }

  compareResult(result) {
    this.kana = '';
    if (result === this.verb.result1 || result === this.verb.result2) {
      this.currentStreak = String(Number(this.currentStreak) + 1);
      if (this.currentStreak > this.maxStreak) {
        this.maxStreak = String(Number(this.maxStreak) + 1);
      }
      this.showPoint();
      this.refreshList();
    } else {
      this.showCorrect();
      this.input = result;
      this.currentStreak = '0';
    }
  }

  showCorrect() {
    const correct = document.getElementById('correct');
    correct.style.display = 'block';
    this.disabledResult = true;
  }

  hideCorrect() {
    const correct = document.getElementById('correct');
    correct.style.display = 'none';
    this.disabledResult = false;
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

}
