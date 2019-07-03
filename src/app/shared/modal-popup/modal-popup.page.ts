import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'pr-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPopupPage implements OnInit {
  modalTitle: string;
  modelId: number;
  photo: SafeResourceUrl;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private sanitizer: DomSanitizer,
    private imagePicker: ImagePicker
  ) {}

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

  async takePicture() {
    ////////////// Open Camera ///////////////////

    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    }).catch(error => {
      console.log(error);
    });

    if (image && image.dataUrl) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.dataUrl
      );
      this.modalController.dismiss(image);
    }
  }

  async getPictureFomLibrary() {

    ///////////////// Get Picture From Library ////////////////
    const options = {
      maximumImagesCount: 1,
      width: 100,
      height: 100,
      quality: 100
    };
    this.imagePicker.getPictures(options).then(
      results => {
        for (const pic of results) {  // let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + pic);
        }
      },
      err => {}
    );
    this.modalController.dismiss();
  }
}
