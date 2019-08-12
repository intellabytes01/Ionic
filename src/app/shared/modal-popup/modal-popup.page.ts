import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertService } from '../services/alert.service';
import {
  ProfileState,
  imageUpload
} from '@app/pages/Retailer/profile/store/profile.reducers';
import { Store, select } from '@ngrx/store';
import { ImageUpload } from '@app/pages/Retailer/profile/store/profile.actions';
import { untilDestroyed } from '@app/core';
declare var window;

@Component({
  selector: 'pr-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPopupPage implements OnInit {
  modalTitle: string;
  modelId: number;
  imgUrl: string;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private camera: Camera,
    private alert: AlertService,
    private store: Store<ProfileState>
  ) {}

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    await this.modalController.dismiss({ data: this.imgUrl });
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType,
      targetWidth: 500,
      targetHeight: 500
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.modalController.dismiss(imageData);
        this.uploadMedia(imageData);
      },
      () => {}
    );
  }

  uploadMedia(imageData) {
    console.log('uploadMedia');
    window.resolveLocalFileSystemURL(imageData, (fileEntry: any) => {
      fileEntry.file(fileObj => {
        console.log('fileObj: ', fileObj);
        // if (fileObj.size <= 1000000) {
        const payload = {
          file: fileObj,
          type: 'DL',
          reqOpts: {
            headers: null
          },
          retailerId: 3
        };
        this.store.dispatch(new ImageUpload(payload));
        this.store
          .pipe(
            select(imageUpload),
            untilDestroyed(this)
          )
          .subscribe(imgUrl => {
            console.log(imgUrl);
            this.imgUrl = imgUrl;
            if (this.imgUrl) {
              this.closeModal();
            }
          });
        // }
        // else {
        //   this.alert.presentToast('danger',
        //     "Please upload files less than or equal to 1 MB."
        //   );
        // }
      });
    });
  }
}
