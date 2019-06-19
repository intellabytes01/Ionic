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
  validation_messages = this.translateService.instant('VALIDATIONS.FEEDBACK');
  feedbackTypes$: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private store: Store<FeedbackState>,
    private translateService: TranslateService
  ) {
    this.getFeedbackTypes();
    this.feedbackTypes$ = this.store.pipe(select(feedbackTypesData));
  }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required])],
      feedbackType: [
        {
          Fid: null,
          Types: ''
        },
        Validators.compose([this.validateType])
      ],
      feedbackTo: [
        {
          Fid: null,
          Types: ''
        },
        Validators.compose([this.validateType])
      ],
      toStoreId: [
        {
          Fid: null,
          Types: ''
        },
        Validators.compose([this.validateType])
      ]
    });
  }

  sendFeedback() {
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    }

    const payload = {
      subject: this.feedbackForm.value.feedbackType,
      message: this.feedbackForm.value.message,
      feedbackTo: this.feedbackForm.value.feedbackTo,
      toStoreId: this.feedbackForm.value.toStoreId
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
  }

  updateFeedbackTo(value) {
    this.feedbackForm.value.feedbackTo.Fid = value.Fid;
  }

  updateStore(value) {
    this.feedbackForm.value.toStoreId.Fid = value.Fid;
  }

  getFeedbackTypes() {
    this.store.dispatch(new FeedbackTypes());
  }

  ngOnDestroy() {}
}
