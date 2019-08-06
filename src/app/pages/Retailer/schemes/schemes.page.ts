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
          this.schemeList = state;
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
          this.schemeCompanyList[index] = state;
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
          this.schemeProductList = state;
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
