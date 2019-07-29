import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  loading: any;
  loader = false;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async basicAlert(message) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Alert',
      message,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });
    await this.loading.present();
  }

  dismissLoader() {
    if (this.loading != null) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  async presentToast(type: string, msg: string, duration?: number) {
    let color: string;
    if (type === 'success') {
      color = 'success';
    } else if (type === 'danger') {
      color = 'danger';
    } else if (type === 'warning') {
      color = 'warning';
    } else {
      color = 'secondary';
    }

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 3000,
      position: 'bottom',
      color
    });
    toast.present();
  }

  async exitModal(msg: string) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    alert.present();
  }

  async confirmationModal(title: string, msg: string, navigateTo?: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: 'Confirm',
          handler: () => {
            this.router.navigate([navigateTo]);
          }
        }
      ]
    });

    alert.present();
  }
}
