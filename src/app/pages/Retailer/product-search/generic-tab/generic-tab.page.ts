import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-tab',
  templateUrl: './generic-tab.page.html',
  styleUrls: ['./generic-tab.page.scss'],
})
export class GenericTabPage implements OnInit {

  placeholder: string = '';
  genericList: any[] = [];
  constructor() { }

  ngOnInit() {}

}
