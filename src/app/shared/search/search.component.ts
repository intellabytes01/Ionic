import { Component, OnInit, Input, Output } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'pr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

// tslint:disable-next-line: no-input-rename
  @Input('searchPlaceholder')
  searchPlaceholder: string;

// tslint:disable-next-line: no-input-rename
  @Input('searchList')
  searchList: any[];

  searchText = '';

  constructor(public events: Events) {}

  initializeItems() {
  }

  ngOnInit() {}

  search() {
  }
}
