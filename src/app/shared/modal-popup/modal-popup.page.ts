import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { ImageUpload } from '@app/core/authentication/actions/auth.actions';
import { AuthState, getUserImage, getRetailerId } from '@app/core/authentication/auth.states';

@Component({
  selector: 'pr-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPopupPage implements OnInit {
  modalTitle: string;
  modelId: number;
  modelImageType: string;
  imgUrl: string;
  retailerId: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private camera: Camera,
    private store: Store<AuthState>  ) {}

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.modelImageType = this.navParams.data.paramUserImageType;

    this.store
    .pipe(
      select(getRetailerId),
      untilDestroyed(this)
    )
    .subscribe(retId => {
      this.retailerId = retId;
    }, err => {
      console.log(err);
      this.imgUrl = '';
      this.closeModal();
    });



    this.store
      .pipe(
        select(getUserImage),
        untilDestroyed(this)
      )
      .subscribe(imgUrl => {
        console.log(imgUrl);
        this.imgUrl = imgUrl;
        if (this.imgUrl) {
          this.closeModal();
        }
      }, err => {
        console.log(err);
        this.imgUrl = '';
        this.closeModal();
      });
  }

  async closeModal() {
    await this.modalController.dismiss(this.imgUrl);
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType,
      targetWidth: 500,
      targetHeight: 500
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log('*' + base64Image);
        this.uploadMedia(base64Image);
      },
      err => {
        console.log('#' + err);
        // Handle error
      }
    );
  }

  uploadMedia(imageData) {
    const payload = {
      file: {
        name: this.retailerId + '_' + this.modelImageType + '.jpeg',
        data: imageData
      },
      type: this.modelImageType,
      retailerId: Number(this.retailerId)
    };
    console.log('payload: ', payload);
    this.store.dispatch(new ImageUpload(payload));
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}
}
