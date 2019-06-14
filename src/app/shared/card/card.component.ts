import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() pages: any[];
  constructor() { }

  ngOnInit() {
    console.log(this.pages);
  }

  trackByFn(index, item) {
    return index;
  }

}
