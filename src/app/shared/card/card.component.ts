import { Component, OnInit, Input } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'pr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() pages: any[];
  constructor(private events: Events) {
  }

  ngOnInit() {
    this.test()
  }

  trackByFn(index, item) {
    return index;
  }

  test(){
    //testing

    console.log('testing');
    let testOrderData = {};
    testOrderData[`Order1561453855577`] = {
      store: 'Demo Store 2',
      productList: [
        {
          name: 'Corex',
          id: '1'
        }
      ],
      total: 800,
      deliveryMode: 'Deliver to Store',
      priority: 'Normal',
      remarks: ''
    };
    this.events.publish('orderUpdate', testOrderData);
  }

}
