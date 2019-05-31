import { Component, OnInit, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  @Input() link;
  constructor() { }

  ngOnInit() {}

}
