import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationFilterModalPage } from './notification-filter-modal/notification-filter-modal.page';
import { NotificationList } from './store/notification.actions';
import { Store, select } from '@ngrx/store';
import { NotificationState, NotificationTypeResponse } from './store/notification.state';
import { notificationListData } from './store/notification.reducers';
import { AuthState, getUserId } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pr-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit {
  notificationList$: Observable<NotificationTypeResponse>;
  userId: string;
  constructor(
    public modalController: ModalController,
    private store: Store<NotificationState>,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit() {
    this.authStore.select(getUserId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.userId = state;
      },
      e => {}
    );
    this.getNotificationList();
    this.notificationList$ = this.store.pipe(select(notificationListData));
  }

  async presentModalNotificationFilter() {
    const modal = await this.modalController.create({
      component: NotificationFilterModalPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }

  getNotificationList() {
    const payload = {
      userId: this.userId
    };
    this.store.dispatch(new NotificationList(payload));
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}
}
