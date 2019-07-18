import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'pr-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() items: [];
  @Input() id: string;
  @Input() name: string;
  @Input() canSearch: boolean;
  @Input() ctrName: string;
  @Input() placeHolder: string;
  @Input() preSelectedValue: string;
  @Input() preSelectedOn: string;
  @Input() disableControl: boolean;

  @Output() valueChange = new EventEmitter();

  private selectedValueArray = [];
  public selectedValue = '';

  constructor() {}

  ngOnInit() {}

  selectChange(event: { component: IonicSelectableComponent; value: any }) {
    this.valueChange.emit(event.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    const self = this;
    if (this.preSelectedOn && this.preSelectedValue && this.items.length > 0) {
      this.items.filter(item => {
// tslint:disable-next-line: triple-equals
        if (item[self.preSelectedOn] == self.preSelectedValue) {
          self.selectedValue = item;
          return self.selectedValue;
        }
      });
    }
  }
}
