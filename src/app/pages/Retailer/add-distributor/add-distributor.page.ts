import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.page.html',
  styleUrls: ['./add-distributor.page.scss'],
})
export class AddDistributorPage implements OnInit {
  tabInfo = ['request', 'status', 'add'];
  constructor() {}

  ngOnInit() {
  }
}
