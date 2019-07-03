import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-tab',
  templateUrl: './company-tab.page.html',
  styleUrls: ['./company-tab.page.scss'],
})
export class CompanyTabPage implements OnInit {

  placeholder: string = '';
  companyList: any[] = [];
  constructor() { }

  ngOnInit() {}

}
