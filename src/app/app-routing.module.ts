import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPreloadingStrategy } from './app-preloading.module';
import { AuthenticationGuard } from './core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { NoComponentPage } from './pages/no-component/no-component.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/auth/login/login.module#LoginModule',
    data: { title: '', preload: false, delay: true }
  },
  {
    path: 'register',
    loadChildren: './pages/auth/register/register.module#RegisterPageModule',
    data: { title: '', preload: false, delay: true }
  },
  {
    path: 'forgot-password',
    loadChildren:
      './pages/auth/forgot-password/forgot-password.module#ForgotPasswordPageModule',
    data: { title: '', preload: false, delay: true }
  },
  {
    path: 'change-password',
    loadChildren:
      './pages/auth/change-password/change-password.module#ChangePasswordPageModule',
    data: { title: 'Change Password', preload: false, delay: true }
  },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutModule',
    data: { title: 'About', preload: false, delay: true }
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
    data: { title: 'Home', preload: true, delay: false },
    canLoad: [AuthenticationGuard]
  },

  // {
  //   path: 'dashboard',
  //   loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
  //   data: {title: 'Home', preload: true, delay: false, permissions: {
  //     only: 'ADMIN',
  //     redirectTo: '/add-distributor'
  //   }},
  //   canActivate: [AuthenticationGuard, NgxPermissionsGuard]
  // },

  {
    path: 'add-distributor',
    loadChildren:
      './pages/Retailer/add-distributor/add-distributor.module#AddDistributorPageModule',
    data: { title: 'Add Distributor', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'feedback',
    loadChildren:
      './pages/Retailer/feedback/feedback.module#FeedbackPageModule',
    canActivate: [AuthenticationGuard],
    data: { title: 'Feedback', preload: false, delay: true }
  },
  {
    path: 'profile',
    loadChildren: './pages/Retailer/profile/profile.module#ProfilePageModule',
    canActivate: [AuthenticationGuard],
    data: { title: 'My Profile', preload: false, delay: true }
  },
  {
    path: 'new-order',
    loadChildren:
      './pages/Retailer/new-order/new-order.module#NewOrderPageModule',
    canActivate: [AuthenticationGuard],
    data: { title: 'New Order', preload: false, delay: true }
  },
  {
    path: 'myorder',
    loadChildren: './pages/my-order/my-order.module#MyOrderPageModule',
    canActivate: [AuthenticationGuard],
    data: { title: 'My Orders', preload: false, delay: true }
  },
  {
    path: 'product-search',
    loadChildren:
      './pages/Retailer/product-search/product-search.module#ProductSearchPageModule',
    data: { title: 'Product Search', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'payments',
    loadChildren:
      './pages/Retailer/payments/payments.module#PaymentsPageModule',
    data: { title: 'Payment', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'schemes',
    loadChildren: './pages/Retailer/schemes/schemes.module#SchemesPageModule',
    data: { title: 'Schemes', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'refer-earn',
    loadChildren:
      './pages/Retailer/refer-earn/refer-earn.module#ReferEarnPageModule',
    data: { title: 'Refer & Earn', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'draft-order',
    loadChildren:
      './pages/Retailer/draft-order/draft-order.module#DraftOrderPageModule',
    data: { title: 'Draft Order', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'my-invoices',
    loadChildren:
      './pages/Retailer/my-invoices/my-invoices.module#MyInvoicesPageModule',
    data: { title: 'My Invoices', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'delivery-tracker',
    loadChildren:
      './pages/Retailer/delivery-tracker/delivery-tracker.module#DeliveryTrackerPageModule',
    data: { title: 'Delivery Tracker', preload: false, delay: true },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'mall',
    loadChildren: './pages/mall/mall.module#MallPageModule',
    data: { title: 'Pharma Mall', preload: false, delay: false },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'notification',
    loadChildren:
      './pages/notification/notification.module#NotificationPageModule',
    data: { title: 'Notification', preload: false, delay: false },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'new-sales-return',
    loadChildren:
      './pages/Retailer/sales-return/sales-return.module#SalesReturnPageModule',
    data: { title: 'New Sales Return', preload: false, delay: false },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'view-sales-return',
    loadChildren:
      './pages/Retailer/view-sales-return/view-sales-return.module#ViewSalesReturnPageModule',
    data: { title: 'My Sales Return', preload: false, delay: false },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'language',
    loadChildren: './pages/language/language.module#LanguagePageModule',
    data: { title: 'Language', preload: false, delay: false },
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    component: NoComponentPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
