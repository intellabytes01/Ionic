import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FeedbackState } from './store/feedback.state';
import { feedbackTypesData } from './store/feedback.reducers';
import { FeedbackTypes, FeedbackSubmit } from './store/feedback.actions';
import * as fromModel from './feedback-data.json';
import { TranslateService } from '@ngx-translate/core';
import { getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss']
})
export class FeedbackPage implements OnInit {
  public feedbackForm: FormGroup;
  feedbackTypes: any[] = [];
  feedbackTos: any[] = fromModel.feedbackTos;
  toStoreIds: any[] = fromModel.toStoreIds;
  feedbacktypeStore: any;
// tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('VALIDATIONS.FEEDBACK');
  feedbackTypes$: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private store: Store<FeedbackState>,
    private translateService: TranslateService
  ) {
    this.getRetailerStoreParties();
    this.getFeedbackTypes();
    this.feedbackTypes$ = this.store.pipe(select(feedbackTypesData));
    this.store.pipe(select(feedbackTypesData)).subscribe(data => {
      console.log(data);
    });


  }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required])],
      feedbackType: [
        {
          Fid: null,
          Types: ''
        },
        Validators.compose([])
      ],
      feedbackTo: [
        {
          Fid: null,
          Types: ''
        },
        Validators.compose([])
      ],
      toStoreId: [
        {
          Fid: null,
          Types: ''
        },
        Validators.compose([])
      ]
    });
  }

  sendFeedback() {
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    }

    const payload = {
      subject: this.feedbackForm.value.feedbackType.Types,
      message: this.feedbackForm.value.message,
      feedbackTo: this.feedbackForm.value.feedbackTo.Fid,
      toStoreId: this.feedbackForm.value.toStoreId.Fid
    };
    this.store.dispatch(new FeedbackSubmit(payload));
  }

  // Custom validation for feedback type

  validateType(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.Fid) {
      return { validValue: true };
    }
    return null;
  }

  updateFeedbackTypes(value) {
    this.feedbackForm.value.feedbackType.Fid = value.Fid;
    this.feedbackForm.value.feedbackType.Types = value.Types;
    if (value.Fid === 5 || value.Fid === 6 || value.Fid === 8) {
      this.feedbackTos = fromModel.feedbackTosMultiple;
    } else {
      this.feedbackTos = fromModel.feedbackTos;
    }
  }

  updateFeedbackTo(value) {
    this.feedbackForm.value.feedbackTo.Fid = value.Fid;
    this.feedbackForm.value.feedbackTo.Types = value.Types;
  }

  updateStore(value) {
    this.feedbackForm.value.toStoreId.Fid = value.StoreId;
    this.feedbackForm.value.toStoreId.Types = value.StoreName;
  }

  getFeedbackTypes() {
    this.store.dispatch(new FeedbackTypes());
  }

  async getRetailerStoreParties() {
    await this.store.pipe(select(getRetailerStoreParties), untilDestroyed(this)).subscribe(storeId => {
      this.toStoreIds = storeId;
    });
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}
}
