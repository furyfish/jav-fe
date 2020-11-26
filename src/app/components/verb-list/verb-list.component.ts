import {Component, OnInit} from '@angular/core';
import {VerbService} from 'src/app/services/verb.service';
import * as wanakana from 'wanakana';
import {applyPolyfills, defineCustomElements} from '@paulbarre/wc-furigana/loader';

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

  constructor(private verbService: VerbService) {
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

  compareResult(btnResult) {
    if (btnResult === this.verb.result1 || btnResult === this.verb.result2) {
      console.log('GOOD');
      this.currentStreak += 1;
      if (this.currentStreak > this.maxStreak) {
        this.maxStreak += 1;
      }
    } else {
      console.log('BAD');
      this.currentStreak = 0;
    }
    this.refreshList();
  }

  convertRomajiToKana(romaji) {
    const iKana = wanakana.toKana(romaji, {customKanaMapping: {nn: 'ん', n: 'n'}});
    this.kana = iKana;
    return iKana;
  }

  insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }

}
