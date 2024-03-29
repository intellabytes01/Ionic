import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopLoaderService {
  public isLoading = new BehaviorSubject(false);
  public norecord = new BehaviorSubject(false);
  constructor() { }
}
