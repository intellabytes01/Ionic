import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPreloadingStrategy } from './app-preloading.module';
import { AuthenticationGuard } from './core';
import { NgxPermissionsGuard } from 'ngx-permissions';

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
    canActivate: [AuthenticationGuard]
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
    data: { title: 'Add Distributor', preload: false, delay: true }
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
    data: {title: 'My Orders', preload: false, delay: true}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
