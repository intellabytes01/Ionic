import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft-tab',
  templateUrl: './draft-tab.page.html',
  styleUrls: ['./draft-tab.page.scss']
})
export class DraftTabPage implements OnInit {
  draftList: any[] = [];
  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.fetchFromStorage();
  }

  fetchFromStorage() {
    this.storage.forEach((value, key, index) => {
      if (key.split('#')[0] === 'Order') {
        if (!value['Deleted'] && !value['Confirmed']) {
          this.draftList.push(value);
        }
      }
    });
    setTimeout(() => {
      console.log(this.draftList);
    }, 1000);
  }

  goToNewOrder(order) {
    this.router.navigateByUrl('new-order', {
      state: { orderKey: order.Key }
    });
  }

  deleteOrder(order, i) {
    this.storage.remove(order.key);
    this.draftList.splice(i, 1);
  }
}
