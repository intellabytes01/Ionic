import { Injectable } from '@angular/core';
import { CleverTap } from '@ionic-native/clevertap/ngx';
import { ProfileState, getProfileDetails } from '@app/pages/Retailer/profile/store/profile.reducers';
import { Store, select } from '@ngrx/store';
import { getUserId } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import { GetProfileDetails } from '@app/pages/Retailer/profile/store/profile.actions';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  profileDetails: any;
  constructor(private cleverTap: CleverTap, private store: Store<ProfileState>, private appVersion: AppVersion) {}

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
    profileObj['Name'] = this.profileDetails.RetailerName ? this.profileDetails.RetailerName : '';
    profileObj['Identity'] = this.profileDetails.Address1 ? this.profileDetails.Address1 : '';
    profileObj['UserId'] = this.profileDetails.RetailerId ? this.profileDetails.RetailerId : '';
    profileObj['Phone'] = this.profileDetails.MobileNumber ? this.profileDetails.MobileNumber : '';
    profileObj['Email'] = this.profileDetails.Email ? this.profileDetails.Email : '';
    profileObj['Stores'] = this.profileDetails.RetailerName ? this.profileDetails.RetailerName : '';
    profileObj['AppVersion'] = this.appVersion.getVersionNumber() ? this.appVersion.getVersionNumber() : '';
    profileObj['Region'] = this.profileDetails.RegionName ? this.profileDetails.RegionName : '';
    profileObj['Pincode'] = this.profileDetails.Pincode ? this.profileDetails.Pincode : '';
    console.log(profileObj);
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
  setCleverTapPageView(title) {
    this.cleverTap.recordEventWithName(this.toTitleCase(title) + ' page viewed');
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

  recordEventWithNameAndPropsMehod(title?, obj?) {
    this.cleverTap.recordEventWithNameAndProps(
      'Distributor selected',
      obj
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

  getUserId() {
    this.store
      .pipe(
        select(getUserId),
        untilDestroyed(this)
      )
      .subscribe(userId => {
        this.getProfileDetails(userId);
      });
  }

  getProfileDetails(userId) {
    this.store.dispatch(new GetProfileDetails(userId));
    this.store
      .pipe(
        select(getProfileDetails),
        untilDestroyed(this)
      )
      .subscribe(data => {
        this.profileDetails = data;
      });
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

  generateUUID() {
    let d: any;
    d = new Date();
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    d = d.getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line: no-bitwise
      const r = (Number(d) + Math.random() * 16) % 16 | 0;
      d = Math.floor(Number(d) / 16);
      // tslint:disable-next-line: no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  onUserLoginMethod(name) {
    const obj = {};
    obj['Identity'] = name;
    this.cleverTap.onUserLogin(obj);
  }
}
