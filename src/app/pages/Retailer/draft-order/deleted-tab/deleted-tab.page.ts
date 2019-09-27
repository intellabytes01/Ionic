import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-deleted-tab',
  templateUrl: './deleted-tab.page.html',
  styleUrls: ['./deleted-tab.page.scss'],
})
export class DeletedTabPage implements OnInit {
  draftList: any[] = [];
  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.fetchFromStorage();
  }

  fetchFromStorage() {
    this.storage.forEach((value, key, index) => {
      if (key.split('#')[0] === 'Order') {
        if (value['Deleted']) {
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
