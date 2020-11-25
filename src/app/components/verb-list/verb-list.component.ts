import {Component, OnInit} from '@angular/core';
import {VerbService} from 'src/app/services/verb.service';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})
export class VerbListComponent implements OnInit {

  verb: any;
  currentStreak = 0;
  maxStreak = 0;

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
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveOneVerb();
    this.currentStreak = 0;
    this.maxStreak = 0;
  }

}
