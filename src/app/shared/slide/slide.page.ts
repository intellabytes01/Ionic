import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pr-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    direction: 'horizontal',
    autoplay: true
  };

  constructor() { }

  ngOnInit() {
  }

}
