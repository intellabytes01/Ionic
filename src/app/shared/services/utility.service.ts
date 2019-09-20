import { Injectable } from '@angular/core';
import { CleverTap } from '@ionic-native/clevertap/ngx';
import {
  AuthState,
  getUserDetailsFromState
} from '@app/core/authentication/auth.states';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { Device } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  userDetails: any;
  deviceInfo: any;
  constructor(
    private cleverTap: CleverTap,
    private authStore: Store<AuthState>
  ) {
    this.authStore
      .select(getUserDetailsFromState, untilDestroyed(this))
      .subscribe(
        (state: any) => {
          this.userDetails = state;
        },
        e => {}
      );

    Device.getInfo().then(val => {
      this.deviceInfo = val;
    });
  }

  objectToArray(obj) {
    const mapped = Object.keys(obj).map(key => ({
      type: key,
      value: obj[key]
    }));
    return mapped;
  }

  cleverTapInit() {
    this.cleverTap.setDebugLevel(1277182231);
    if (
      this.checkNull(sessionStorage.getItem('CTnotifyDeviceReady')) === 'null'
    ) {
      this.cleverTap.notifyDeviceReady();
      sessionStorage.setItem('CTnotifyDeviceReady', 'true');
    } else {
      if (sessionStorage.getItem('CTnotifyDeviceReady') !== 'true') {
        this.cleverTap.notifyDeviceReady();
        sessionStorage.setItem('CTnotifyDeviceReady', 'true');
      }
    }
    this.cleverTap.registerPush();
    this.cleverTap.enablePersonalization();
    const currentActivePage = sessionStorage.getItem('currentActivePage');
    if (
      this.checkNull(currentActivePage) !== 'null' &&
      currentActivePage !== 'page_login' &&
      currentActivePage !== 'page_sign-up' &&
      currentActivePage !== 'page_forgot-password' &&
      currentActivePage !== 'page_otp'
    ) {
      this.cleverTap.profileSet(this.getUserObjCleverTap());
    }
    this.cleverTap.getLocation().then(
      loc => {
        console.log('CleverTapLocation is ' + loc.lat + loc.lon);
        this.cleverTap.setLocation(loc.lat, loc.lon);
      },
      error => {
        console.log('CleverTapLocation error is ' + error);
      }
    );
  }

  getUserObjCleverTap() {
    const profileObj = {};
    profileObj['Name'] = '';
    profileObj['Identity'] = '';
    profileObj['UserId'] = '';
    profileObj['Phone'] = '';
    profileObj['Email'] = '';
    profileObj['Stores'] = '';
    profileObj['AppVersion'] = this.deviceInfo.AppVersion;
    profileObj['Region'] = '';
    profileObj['Pincode'] = '';
    return profileObj;
  }

  storeIdToString() {
    const stores = [];
    // if (this.checkNull(dr_StoreParties) !== 'null') {
    //   $.each(dr_StoreParties, (index, item) {
    //     stores.push(item.StoreId);
    //   });
    // }
    return stores.toString();
  }

  // tslint:disable-next-line: variable-name
  setCleverTapPageView(title, a_title: any) {
    if (this.checkNull(a_title) !== 'null' && a_title === 'dashboard') {
      if (
        this.checkNull(sessionStorage.getItem('setCTPVDashboard')) === 'null' &&
        sessionStorage.getItem('setCTPVDashboard') !== 'true'
      ) {
        // this.cleverTap.recordEventWithName('Dashboard page viewed');
        sessionStorage.setItem('setCTPVDashboard', 'true');
      }
    } else if (this.checkNull(title) !== 'null' && title === 'login') {
      if (
        this.checkNull(sessionStorage.getItem('setCTPVLogin')) === 'null' &&
        sessionStorage.getItem('setCTPVLogin') !== 'true'
      ) {
        // this.cleverTap.recordEventWithName('Login page viewed');
        sessionStorage.setItem('setCTPVLogin', 'true');
      }
    } else if (
      this.checkNull(a_title) !== 'null' &&
      a_title === 'ProductSearch'
    ) {
    } else if (
      this.checkNull(a_title) !== 'null' &&
      a_title === 'requestmapping'
    ) {
    } else if (this.checkNull(a_title) !== 'null' && a_title === 'addpo') {
    } else if (
      this.checkNull(a_title) !== 'null' &&
      a_title === 'draftorders'
    ) {
    } else if (
      this.checkNull(a_title) !== 'null' &&
      a_title === 'orderdetails'
    ) {
    } else if (this.checkNull(a_title) !== 'null' && title === 'addDist_req') {
    } else if (
      this.checkNull(a_title) !== 'null' &&
      title === 'addDist_status'
    ) {
    } else if (this.checkNull(a_title) !== 'null' && title === 'addDist_add') {
    } else if (
      this.checkNull(a_title) !== 'null' &&
      a_title === 'notification'
    ) {
    } else if (this.checkNull(title) !== 'null' && title === 'register') {
    } else if (
      this.checkNull(title) !== 'null' &&
      title === 'forgotusernamepass'
    ) {
    } else if (this.checkNull(title) !== 'null' && title === 'otpLogin') {
    } else if (
      this.checkNull(title) !== 'null' &&
      a_title === 'deliveryTracker'
    ) {
    } else if (this.checkNull(title) !== 'null' && a_title === 'myprofile') {
    } else if (this.checkNull(title) !== 'null' && title === 'PRStore') {
      if (
        this.checkNull(localStorage.getItem('prLaunchProdTour') !== 'null') &&
        localStorage.getItem('prLaunchProdTour') !== 'true'
      ) {
        this.cleverTap.recordEventWithName(
          this.toTitleCase(title) + ' page viewed'
        );
      }
    } else {
      if (this.checkNull(title) !== 'null') {
        this.cleverTap.recordEventWithName(
          this.toTitleCase(title) + ' page viewed'
        );
      }
    }
  }

  setCleverTapButtonClick(title: any) {
    console.log(title + ' button clicked');
    this.cleverTap.recordEventWithName(title + ' button clicked');
  }

  setCleverTapTransactionDetails(
    transactionId,
    storeName,
    totalAmount,
    transactionItems,
    storeId,
    partyCode
  ) {
    const detailsObj = {};
    detailsObj['TransactionId'] = transactionId;
    detailsObj['StoreName'] = storeName;
    detailsObj['Amount'] = totalAmount;
    // tslint:disable-next-line: radix
    detailsObj['StoreId'] = parseInt(storeId);
    detailsObj['PartyCode'] = partyCode;

    const itemsArr = [];
    transactionItems.forEach(element => {
      const row = element;
      const lineItem = {};
      lineItem['ProductName'] = row.DisplayStoreProduct.ProductName.replace(
        /\\/g,
        ''
      ).replace(/'/g, '');
      lineItem['ProductCode'] = row.DisplayStoreProduct.ProductCode.replace(
        /\\/g,
        ''
      ).replace(/'/g, '');
      lineItem['Quantity'] = row.Quantity;
      lineItem['Free'] = row.Free;
      lineItem['PTR'] = row.PTR;
      lineItem['Scheme'] = row.Scheme;
      itemsArr.push(lineItem);
    });

    this.cleverTap.recordChargedEventWithDetailsAndItems(detailsObj, itemsArr);
  }

  setCleverTapAddToCart(itemObj) {
    const propertiesObj = {};
    propertiesObj[
      'ProductName'
    ] = itemObj.DisplayStoreProduct.ProductName.replace(/\\/g, '').replace(
      /'/g,
      ''
    );
    propertiesObj[
      'ProductCode'
    ] = itemObj.DisplayStoreProduct.ProductCode.replace(/\\/g, '').replace(
      /'/g,
      ''
    );
    propertiesObj['StoreName'] = itemObj.DisplayStoreProduct.StoreName;
    // tslint:disable-next-line: radix
    propertiesObj['StoreId'] = parseInt(itemObj.DisplayStoreProduct.StoreId);
    // tslint:disable-next-line: radix
    propertiesObj['Stock'] = parseInt(itemObj.DisplayStoreProduct.Stock);
    propertiesObj['Category'] = itemObj.DisplayStoreProduct.Category;
    propertiesObj['Company'] = itemObj.DisplayStoreProduct.Company;
    propertiesObj['Quantity'] = itemObj.Quantity;
    propertiesObj['Free'] = itemObj.Free;
    propertiesObj['PTR'] = itemObj.PTR;
    propertiesObj['Scheme'] = itemObj.Scheme;
    propertiesObj['Amount'] = Number(itemObj.Quantity) * Number(itemObj.PTR);

    this.cleverTap.recordEventWithNameAndProps(
      'Product added to cart',
      propertiesObj
    );
  }

  setCleverTapNewOrderDistributorSelected(distName) {
    const propertiesObj = {};
    propertiesObj['StoreName'] = distName;
    this.cleverTap.recordEventWithNameAndProps(
      'Distributor selected',
      propertiesObj
    );
  }

  toTitleCase(str) {
    const reg = '/wS*/g';
    return str.replace(
      reg,
      str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
    );
  }

  onCleverTapProfileSync(e) {
    console.log(e.updates);
  }

  onCleverTapProfileDidInitialize(e) {
    console.log(e.CleverTapID);
  }

  onCleverTapInAppNotificationDismissed(e) {
    console.log(e);
    console.log(e.extras);
    console.log(e.actionExtras);
  }

  checkNull(response) {
    const responseText =
      response === '' ||
      response === undefined ||
      response === null ||
      response === 'null'
        ? 'null'
        : response;
    return responseText;
  }

  isJSON(jsonString: any) {
    let json = null;
    // console.log('at type of ' + typeof jsonString);
    if (typeof jsonString === 'object') {
      json = jsonString;
      // console.log('at jsonString ' + json);
    } else {
      try {
        // console.log('at try ' + jsonString);
        json = JSON.parse(jsonString);
      } catch (exception) {
        console.log('json exception' + exception);
        json = null;
      }
    }
    return json;
  }

  groupBy(items) {
    const temporaryObject = {};
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        typeof temporaryObject[item.StoreId] ===
        'undefined'
      ) {
        temporaryObject[item.StoreId] = [];
      }
      // Push the item to the its StoreId of the `temporaryObject`.
      temporaryObject[item.StoreId].push(item);
    }
    return temporaryObject;
  }

  mergeObjects(data, keyToMerge) {
    const resultArray = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const obj = {};
        obj[keyToMerge] = key;
        for (let i = 0; i < data[key].length; i++) {
          obj[i] = data[key][i];
        }
        resultArray.push(obj);
      }
    }
    return resultArray;
  }

  isNumber(value) {
    return value != null && typeof value === 'number';
  }

  checkReturnValue(chkVal, rtnVal) {
    return chkVal === 'null' ||
      chkVal === '' ||
      chkVal === undefined ||
      chkVal === null
      ? rtnVal
      : chkVal;
  }
}
