import { Component, OnInit, Input, Output } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input('searchType')
  searchType: string;

  @Input('searchPlaceholder')
  searchPlaceholder: string;

  @Input('searchList')
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
