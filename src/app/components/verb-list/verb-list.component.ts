import {Component, OnInit} from '@angular/core';
import {VerbService} from 'src/app/services/verb.service';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})
export class VerbListComponent implements OnInit {

  verbs: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  constructor(private verbService: VerbService) { }

  ngOnInit() {
    this.retrieveOneVerb();
  }

  retrieveOneVerb() {
    this.verbService.getOneRandom()
      .subscribe(
        data => {
          this.verbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveOneVerb();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

}
