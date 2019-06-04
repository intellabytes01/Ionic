import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  objectToArray(obj) {
    const mapped = Object.keys(obj).map(
      key => ({
        type: key,
        value: obj[key]
      })
    );
    return mapped;
  }
}
