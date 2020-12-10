import {Component, OnInit} from '@angular/core';
import {VerbService} from 'src/app/services/verb.service';
import * as wanakana from 'wanakana';
import {applyPolyfills, defineCustomElements} from '@paulbarre/wc-furigana/loader';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})
export class VerbListComponent implements OnInit {

  verb: any;
  currentStreak = 0;
  maxStreak = 0;
  kana = '';
  pointClass = 'hidden-point';

  constructor(private verbService: VerbService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.retrieveOneVerb();
  }

  retrieveOneVerb() {
    this.verbService.getRandom()
      .subscribe(
        data => {
          this.verb = data;
          for (let i = 0; i < this.verb.kanji.length; i++) {
            if (wanakana.isKanji(this.verb.kanji.charAt(i))) {
              this.verb.jisho = this.insert(this.verb.kanji, i + 1, '[' + this.verb.furigana + ']');
            }
          }
          console.log(this.verb);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveOneVerb();
    this.kana = '';
  }

  compareResult(result) {
    if (result === this.verb.result1 || result === this.verb.result2) {
      this.currentStreak += 1;
      if (this.currentStreak > this.maxStreak) {
        this.maxStreak += 1;
      }
      this.showPoint();
    } else {
      this.currentStreak = 0;
      this.snackBar.open(result, this.verb.result2, {
        duration: 500000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'fail-dialog'
      });
    }
    this.refreshList();
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
