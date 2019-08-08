import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import {
  AuthState,
  selectAuthState,
  getRetailerName,
  getRetailerStatus
} from "@app/core/authentication/auth.states";
import { Store, select } from "@ngrx/store";
import { untilDestroyed } from "@app/core";
import { Storage } from "@ionic/storage";
import * as fromModel from "./dashboard-data.json";
import { AlertService } from "@app/shared/services/alert.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit, OnDestroy {
  pages: any[] = [];
  userData: object;
  backButton: any;
  permissions: object;
  constructor(
    public menuCtrl: MenuController,
    private translateService: TranslateService,
    private store: Store<AuthState>,
    private storage: Storage,
    private platform: Platform,
    private alert: AlertService,
    private router: Router
  ) {
    
    this.getRetailerName();
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === "/dashboard") {
          this.getRetailerStatus();
        }
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, "menuLeft");
    this.menuCtrl.enable(true, "menuRight");
    this.backButton = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        this.presentAlertConfirm();
      }
    );
  }

  ionViewDidLeave() {
    if (this.backButton) {
      this.backButton.unsubscribe();
    }
  }

  ngOnInit() {
    this.pages = fromModel.data;
    this.permissions = fromModel.permissions;
    this.setPermissions();
    this.store
      .pipe(
        select(selectAuthState),
        untilDestroyed(this)
      )
      .subscribe(data => {
        if (!data["userData"]) {
          this.storage.get("userData").then((value: any) => {
            if (value) {
              this.userData = JSON.parse(value)["userData"];
            }
          });
        } else {
          this.userData = data["userData"]["userData"];
        }
      });
    untilDestroyed(this);
  }

  presentAlertConfirm() {
    this.alert.exitModal(this.translateService.instant("DASHBOARD.EXIT_APP"));
  }

  showUnAuthrorizedMessage() {
    this.alert.presentToast(
      "danger",
      this.translateService.instant("DASHBOARD.USER_ACTIVATION"),
      5000
    );
  }

  showUpdateProfileModal() {
    this.alert.confirmationModal(
      this.translateService.instant("DASHBOARD.UPDATE_PROFILE_MODAL_TITLE"),
      this.translateService.instant("DASHBOARD.UPDATE_PROFILE_MODAL_MESSAGE"),
      "profile"
    );
  }

  async getRetailerName() {
    await this.store
      .pipe(
        select(getRetailerName),
        untilDestroyed(this)
      )
      .subscribe(retailerName => {
        if (!retailerName || retailerName == null || retailerName === "") {
          this.showUpdateProfileModal();
        }
      });
  }

  async getRetailerStatus() {
    await this.store
      .pipe(
        select(getRetailerStatus),
        untilDestroyed(this)
      )
      .subscribe(retailerStatus => {
        if (
          retailerStatus &&
          retailerStatus != null &&
          retailerStatus !== "Authorized"
        ) {
          this.showUnAuthrorizedMessage();
        }
      });
  }

  setPermissions() {    
    this.pages = this.pages.map(val => {
      switch (this.permissions[val.name]['View']){
        case 0:
          val.permissions[0]['perm'].push('VIEW');
          val.disable = true;
        break;

        case 1:
          val.permissions[0]['perm'].push('VIEW');
          val.disable = false;
        break;

        case 2:
        break;
      }
      return val;
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
