import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.page.html',
  styleUrls: ['./schemes.page.scss'],
})
export class SchemesPage implements OnInit {

  placeholder = 'PRODUCT_SEARCH.PLACEHOLDER_PRODUCT';
  productList: any[] = ['Testing 1', 'Testing 2'];
  schemesList: any[] = ['Testing'];
  searchKey = '';
  searchType = 'schemes';
  subListShow: any[] = [];
  constructor(
    private router: Router,
    public events: Events
  ) {
    this.events.subscribe(this.searchType, (searchKey) => {
      this.search(searchKey);
    });
  }

  ngOnInit() {}

  search(searchKey) {
  }

  // For sublist
  toggle(index) {
    if (this.subListShow[index] === undefined) {
      this.subListShow[index] = false;
    }
    this.subListShow[index] = !this.subListShow[index];
  }

}
