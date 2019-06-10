import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss']
})
export class FeedbackPage implements OnInit, OnDestroy {
  public feedbackForm: FormGroup;
  feedbackTypes: any[] = [];
  feedbackTos: any[] = [
    {
      Fid: 1,
      Types: 'Pharmarack'
    },
    {
      Fid: 2,
      Types: 'Distributor'
    },
    {
      Fid: 3,
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
// tslint:disable-next-line: variable-name
  validation_messages = {
    message: [{ type: 'required', message: 'Value is required for Remarks.' }],
    feedbackType: [{ type: 'validValue', message: 'It\'s required.' }],
    feedbackTo: [{ type: 'validValue', message: 'It\'s required.' }],
    toStoreId: [{ type: 'validValue', message: 'It\'s required.' }]
  };
  constructor(
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    // this.feedbacktypeStore = this.store
    //   .select(getAllFeedbackTypes)
    //   .subscribe((state: any) => {
    //     this.feedbackTypes = state;
    //   });
  }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required])],
      feedbackType: [
        {
          typeId: null,
          typeName: ''
        },
        Validators.compose([this.validateType])
      ],
      feedbackTo: [
        {
          typeId: '',
          typeName: ''
        },
        Validators.compose([this.validateType])
      ],
      toStoreId: [
        {
          typeId: null,
          typeName: ''
        },
        Validators.compose([this.validateType])
      ]
    });
    // this.store.dispatch(new fromfeedback.GetAllFeedbackTypes());
  }

  sendFeedback() {
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    }
  }

  // Custom validation for feedback type

  validateType(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.Fid) {
      return { validValue: true };
    }
    return null;
  }

  ngOnDestroy() {
    if (this.feedbacktypeStore) { this.feedbacktypeStore.unsubscribe(); }
  }
}
