import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-refer-earn',
  templateUrl: './refer-earn.page.html',
  styleUrls: ['./refer-earn.page.scss'],
})
export class ReferEarnPage implements OnInit, OnDestroy {

  public referForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('REFER.VALIDATION_MESSAGES');
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  validateuserStore: any;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.referForm = this.formBuilder.group({
      mobile: [
        null,
        Validators.compose([
          Validators.pattern(this.mobnumPattern),
          Validators.required
        ])
      ],
      name: [
        '',
        Validators.compose([Validators.required])
      ],
      agree: [false, Validators.compose([Validators.required])]
    });
  }

  refer() {
    // stop here if form is invalid
    if (this.referForm.invalid) {
      return;
    }

    if (this.referForm.value.agree) {
    } else {
      this.alertService.presentToast('warning', this.translateService.instant('REFER.ACCEPT'));
    }
  }

  // Custom validation for Mobile

  validationMobile(value) {
    this.referForm.controls['mobile'].setValue(
      value.length > 10 ? value.substring(0, 10) : value
    );
    // if (value.length == 10) {
    //   this.validateuserStore = this.AuthService
    //     .validateUser({ mobile: this.referForm.value.mobile })
    //     .subscribe(
    //       (state: any) => {
    //         if (state.success) {
    //           this.alertService.presentToast(state.message);
    //           this.referForm.controls["mobile"].setValue(null);
    //         }
    //       },
    //       e => {}
    //     );
    // }
  }

  ngOnDestroy() {
    if (this.validateuserStore) {
      this.validateuserStore.unsubscribe();
    }
  }

}
