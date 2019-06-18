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

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss']
})
export class FeedbackPage implements OnInit {
  public feedbackForm: FormGroup;
  feedbackTypes: any[] = [];
  feedbackTos: any[] = [
    {
      Fid: '1',
      Types: 'Pharmarack'
    },
    {
      Fid: '2',
      Types: 'Distributor'
    },
    {
      Fid: '3',
      Types: 'Both (Pharmarack / Distributor)'
    }
  ];
  toStoreIds: any[] = [
    {
      Fid: 1,
      Types: 'Demo Store 1'
    },
    {
      Fid: 2,
      Types: 'Demo Store 2'
    },
    {
      Fid: 3,
      Types: 'Demo Store 3'
    }
  ];
  feedbacktypeStore: any;
  validation_messages = {
    message: [{ type: 'required', message: 'Value is required for Remarks.' }],
    feedbackType: [{ type: 'validValue', message: 'It\'s required.' }],
    feedbackTo: [{ type: 'validValue', message: 'It\'s required.' }],
    toStoreId: [{ type: 'validValue', message: 'It\'s required.' }]
  };
  feedbackTypes$: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private store: Store<FeedbackState>
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
    this.feedbackForm.value.feedbackType.typeId = value.typeId;
  }

  updateFeedbackTo(value) {
    this.feedbackForm.value.feedbackTo.typeId = value.typeId;
  }

  updateStore(value) {
    this.feedbackForm.value.toStoreId.typeId = value.typeId;
  }

  getFeedbackTypes() {
    this.store.dispatch(new FeedbackTypes());
  }

  ngOnDestroy() {}
}
