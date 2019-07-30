import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Events, IonContent } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import {
  SchemesState,
  SchemeDetails
} from '../schemes/store/schemes.state';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { Schemes, SchemeCompanies, SchemeProducts } from './store/schemes.actions';
import { schemesData, schemeCompaniesData, schemeProductsData } from './store/schemes.reducers';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.page.html',
  styleUrls: ['./schemes.page.scss'],
})
export class SchemesPage implements OnInit {

  searchKey = '';
  subListShow: any[] = [];
  schemeList: any[] = [];
  schemeCompanyList: any[] = [];
  schemeProductList: any[] = [];
  searchText = '';
  schemeDetails: SchemeDetails;
  showList = true;
  retailerId: number;
  schemeId: number;
  index: number;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<SchemesState>
  ) {}

  ngOnInit() {
    this.getSchemes();
  }

  getSchemes() {
      const payload = {
        regionId: 1
      };
        this.store.dispatch(new Schemes(payload));      

      this.store.select(schemesData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.schemeList = [
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "RegionId": 1
            },
            {
                "CompanyId": "13",
                "CompanyName": "WALLACE PHARMA",
                "RegionId": 1
            },
            {
                "CompanyId": "21",
                "CompanyName": "OZONE PHARMA",
                "RegionId": 1
            },
            {
                "CompanyId": "10",
                "CompanyName": "ALKEM PHARMA",
                "RegionId": 1
            },
            {
                "CompanyId": "16",
                "CompanyName": "PFIZER",
                "RegionId": 1
            },
            {
                "CompanyId": "17",
                "CompanyName": "RANBAXY LTD",
                "RegionId": 1
            },
            {
                "CompanyId": "14",
                "CompanyName": "WOCKHARDT",
                "RegionId": 1
            },
            {
                "CompanyId": "5",
                "CompanyName": "ARISTO PHARMACEUTICALS",
                "RegionId": 1
            },
            {
                "CompanyId": "3",
                "CompanyName": "GLENMARK PHARMA",
                "RegionId": 1
            },
            {
                "CompanyId": "2",
                "CompanyName": "CADILA HEALTHCARE",
                "RegionId": 1
            },
            {
                "CompanyId": "20",
                "CompanyName": "VERITAZ HEALTHCARE LTD.",
                "RegionId": 1
            },
            {
                "CompanyId": "1",
                "CompanyName": "CIPLA",
                "RegionId": 1
            },
            {
                "CompanyId": "4",
                "CompanyName": "ZUVENTUS",
                "RegionId": 1
            },
            {
                "CompanyId": "7",
                "CompanyName": "MICRO LABS",
                "RegionId": 1
            },
            {
                "CompanyId": "15",
                "CompanyName": "ABBOTT HEALTHCARE",
                "RegionId": 1
            },
            {
                "CompanyId": "9",
                "CompanyName": "CORONA",
                "RegionId": 1
            },
            {
                "CompanyId": "18",
                "CompanyName": "THEMIS",
                "RegionId": 1
            },
            {
                "CompanyId": "12",
                "CompanyName": "GUFIC",
                "RegionId": 1
            },
            {
                "CompanyId": "8",
                "CompanyName": "MEGHA HEALTHCARE PVT.LTD",
                "RegionId": 1
            }
        ];
        },
        e => {}
      );
  }

  schemeClick(scheme, index) {
    this.toggle(index);
    const payload = {
      regionId: scheme.RegionId,
      companyId: scheme.CompanyId
    };
    this.store.dispatch(new SchemeCompanies(payload));
    this.store.select(schemeCompaniesData, untilDestroyed(this)).subscribe(
      (state: any) => {
        if (this.index === index) {
          this.schemeCompanyList[index] = [
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "#SYLATE 250 TAB",
                "PCode": "2072",
                "Pack": "10 TAB",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "#SYLATE 500 TAB",
                "PCode": "2071",
                "Pack": "10 TAB",
                "Scheme": "9+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "ANTIPLAR PLUS TAB",
                "PCode": "946",
                "Pack": "110",
                "Scheme": "10+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "ANTIPLAR PLUS TAB",
                "PCode": "2246",
                "Pack": "10 TAB",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "ANTIPLAR TAB",
                "PCode": "741",
                "Pack": "110",
                "Scheme": "9+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "ANTIPLAR TAB",
                "PCode": "2247",
                "Pack": "10 TAB",
                "Scheme": "10+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "ATOREC  40 MG TAB",
                "PCode": "3775",
                "Pack": "10 TAB",
                "Scheme": "9+1"
            },
            {
                "CompanyId": "6",
                "CompanyName": "EMCURE",
                "PName": "ATOREC 10 MG TAB",
                "PCode": "781",
                "Pack": "110",
                "Scheme": "9+1"
            }        
        ];
          this.scrollTo(scheme.CompanyId);
        }
      },
      e => {}
    );
  }

  searchSchemeProducts() {   
    if(this.searchText.length > 0){
      const payload = {
        regionId: 1,
        query: this.searchText
      };   
      this.store.dispatch(new SchemeProducts(payload));      
      
      this.store.select(schemeProductsData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.schemeProductList = [
            {
                "CompanyId": "5",
                "CompanyName": "ARISTO PHARMACEUTICALS",
                "PName": "BACIGYL-N 30ML",
                "PCode": "850",
                "Pack": "10030",
                "Scheme": "9+1"
            },
            {
                "CompanyId": "7",
                "CompanyName": "MICRO LABS",
                "PName": "BACTOCLAV 375 MG TAB#",
                "PCode": "6413",
                "Pack": "10 TAB",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "7",
                "CompanyName": "MICRO LABS",
                "PName": "BACTOCLAV 625 MG TAB ",
                "PCode": "6414",
                "Pack": "10 TAB",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "7",
                "CompanyName": "MICRO LABS",
                "PName": "BACTOCLAV DRY SYRUP ",
                "PCode": "6416",
                "Pack": "30 ML",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "7",
                "CompanyName": "MICRO LABS",
                "PName": "BACTOCLAV DS 457 SYP#",
                "PCode": "6415",
                "Pack": "30 ML",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "7",
                "CompanyName": "MICRO LABS",
                "PName": "BACTOCLAV DT TAB#",
                "PCode": "6417",
                "Pack": "10 TAB",
                "Scheme": "5+1"
            },
            {
                "CompanyId": "4",
                "CompanyName": "ZUVENTUS",
                "PName": "BACTOMIN 375 MG TAB",
                "PCode": "7233",
                "Pack": "10 TAB",
                "Scheme": "5+1"
            }
        ];
        },
        e => {}
      );
    }else{
      this.schemeProductList = [];
    } 
    

  }

  toggle(index) {
    this.index = index;
    if (this.subListShow[index] === undefined) {
      this.subListShow[index] = false;
    }
    this.subListShow[index] = !this.subListShow[index];
    this.subListShow = this.subListShow.map((element, i) => {
      if (i !== index) {
        element = false;
      }
      return element;
    });
  }

  scrollTo(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).scrollIntoView();
    }
  }
}
