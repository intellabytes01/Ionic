import { Component, OnInit, Input, Output } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input()
  searchType: string;

  @Input()
  searchPlaceholder: string;

  @Input()
  searchList: any[];

  searchText = '';

  constructor(public events: Events) {}

  initializeItems() {
  }

  ngOnInit() {}

  search() {
    this.events.publish(this.searchType, this.searchText);
  }
}
