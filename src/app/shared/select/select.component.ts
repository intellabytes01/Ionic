import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'pr-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() items: [];
  @Input() id: string;
  @Input() name: string;
  @Input() canSearch: boolean;
  @Input() ctrName: string;
  @Input() placeHolder: string;

  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.valueChange.emit(event.value);
    // console.log('port:', event.value);
  }

}
