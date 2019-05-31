import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pr-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
 @Input() tabInfo: [];

  constructor() { }

  ngOnInit() {

  }

}
