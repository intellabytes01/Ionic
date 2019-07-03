import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distributor-tab',
  templateUrl: './distributor-tab.page.html',
  styleUrls: ['./distributor-tab.page.scss'],
})
export class DistributorTabPage implements OnInit {

  placeholder: string = '';
  distributorList: any[] = [];
  constructor() { }

  ngOnInit() {}

}
