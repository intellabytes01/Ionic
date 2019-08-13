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
import { File, FileEntry } from '@ionic-native/file/ngx';

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
    private store: Store<ProfileState>,
    private file: File
  ) {}

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    await this.modalController.dismiss(this.imgUrl);
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType,
      targetWidth: 500,
      targetHeight: 500
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.uploadMedia(imageData);
      },
      () => {}
    );
  }

  uploadMedia(imageData) {
    this.file.resolveLocalFilesystemUrl(imageData).then(
      (fileEntry: FileEntry) => {
        console.log('fileEntry: ', fileEntry);
        fileEntry.file(
          fileObj => {
            console.log('fileObj: ', fileObj);
            const reader = new FileReader();
            reader.onloadend = () => {
              const imgBlob = new Blob([reader.result], {
                type: fileObj.type
              });
              const payload = {
                file: imgBlob,
                type: 'DL',
                reqOpts: {
                  headers: null
                },
                retailerId: 3
              };
              console.log('payload: ', payload);
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
            };
            reader.readAsArrayBuffer(fileObj);
          },
          e => {
            console.log(e);
          }
        );
      },
      e => {
        console.log(e);
      }
    );
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}
}
