import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pr-notification-filter-modal',
  templateUrl: './notification-filter-modal.page.html',
  styleUrls: ['./notification-filter-modal.page.scss'],
})
export class NotificationFilterModalPage implements OnInit {

  public notificationFilterForm: FormGroup;
  statusList: any[] = [{
    id: 8,
    name: 'Pratham Enterprises'
  }];
  constructor(public modalController: ModalController, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.notificationFilterForm = this.formBuilder.group({
      status: [
        {
          id: 8,
          name: 'Pratham Enterprises'
        },
        Validators.compose([])
      ],
      date: [
        new Date().toISOString(),
        Validators.compose([Validators.required])
      ]
    });
  }

  updateStatus(event) {

  }

  notificationFilterSubmit() {

  }

}
