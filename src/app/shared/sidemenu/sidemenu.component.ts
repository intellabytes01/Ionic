import { Component, OnInit, OnDestroy } from "@angular/core";

import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import {
  USER_DATA,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  PROFILE_ROUTE,
  REFER_ROUTE,
  FEEDBACK_ROUTE,
  DASHBOARD_TITLE,
  LOGOUT_TITLE,
  CHANGE_PASSWORD_TITLE,
  FEEDBACK_TITLE,
  TERMS_TITLE,
  NOTIFICATION_TITLE,
  PROFILE_TITLE,
  REFER_TITLE,
  TERMS_URL
} from "@constants/constants";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-sidemenu",
  templateUrl: "./sidemenu.component.html",
  styleUrls: ["./sidemenu.component.scss"]
})
export class SidemenuComponent implements OnInit {
  public leftMenuPages = [
    {
      title: DASHBOARD_TITLE,
      url: DASHBOARD_ROUTE,
      icon: "dashboard"
    },
    {
      title: PROFILE_TITLE,
      url: PROFILE_ROUTE,
      icon: "dashboard"
    },
    {
      title: REFER_TITLE,
      url: REFER_ROUTE,
      icon: "dashboard"
    },
    {
      title: CHANGE_PASSWORD_TITLE,
      url: CHANGE_PASSWORD_ROUTE,
      icon: "dashboard"
    },
    {
      title: FEEDBACK_TITLE,
      url: FEEDBACK_ROUTE,
      icon: "dashboard"
    },
    {
      title: NOTIFICATION_TITLE,
      url: DASHBOARD_ROUTE,
      icon: "dashboard"
    },
    {
      title: TERMS_TITLE,
      url: DASHBOARD_ROUTE,
      icon: "dashboard"
    },
    {
      title: LOGOUT_TITLE,
      url: LOGIN_ROUTE,
      icon: "dashboard"
    }
  ];

  public rightMenuPages = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Add PO",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "View PO",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Draft PO",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Add distributor",
      url: "add-distributor",
      icon: "dashboard"
    },
    {
      title: "Scheme",
      url: "schemes",
      icon: "dashboard"
    },
    {
      title: "Product search",
      url: "product-search",
      icon: "dashboard"
    },
    {
      title: "Payments",
      url: "payments",
      icon: "dashboard"
    },
    {
      title: "Add Credit note",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "View Credit  note",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Pharma mall",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Delivery tracker",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "View invoice",
      url: "/dashboard",
      icon: "dashboard"
    }
  ];

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  openPage(page) {
    this.menuCtrl.close();
    if (page.url === LOGIN_ROUTE) {
      this.logout();
    }
    if (page.title === TERMS_TITLE) {
      window.open(TERMS_URL, "_system");
    }
    this.router.navigate([page.url]);
  }

  logout() {
    this.storage.clear();
    localStorage.clear();
  }
}
