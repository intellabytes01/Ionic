import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  loading: any;
  loader = false;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
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

  async presentToast(type: string, msg: string) {
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
      duration: 3000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
