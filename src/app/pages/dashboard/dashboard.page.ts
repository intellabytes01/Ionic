import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
// import { UserSummary, RetailerStorePartiesSummary, RetailerSummary } from '@pages/auth/login/model/user.model';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  // userSummary: UserSummary;
  // retailerSummary: RetailerSummary;
  // retailerStorePartiesSummary: RetailerStorePartiesSummary[];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  pages = [
    { name: "New Order", link: "/", icon: "assets/icon/logo.png" },
    { name: "Payments", link: "/payments", icon: "assets/icon/logo.png" },
    { name: "Draft Order", link: "/draft-order", icon: "assets/icon/logo.png" },
    { name: "Add Distributor", link: "/add-distributor", icon: "assets/icon/logo.png" },
    { name: "Product Search", link: "/product-search", icon: "assets/icon/logo.png" },
    { name: "Schemes", link: "/schemes", icon: "assets/icon/logo.png" }
  ];
  constructor(public menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true, "menuLeft");
    this.menuCtrl.enable(true, "menuRight");
  }

  ngOnInit() {
    // Promise.all([
    // 	localStorage.get('UserSummery'),
    // 	localStorage.get('RetailerSummary'),
    // 	localStorage.get('RetailerStorePartiesSummary')
    // ]).then((data) => {
    // 	this.userSummary = JSON.parse(data[0])[0];
    // 	// this.logger.info(this.userSummary);
    // 	this.retailerSummary = JSON.parse(data[1])[0];
    // 	// this.logger.info(this.retailerSummary);
    // 	this.retailerStorePartiesSummary = JSON.parse(data[2]);
    // 	// this.logger.info(this.retailerStorePartiesSummary);
    // });
  }
}
