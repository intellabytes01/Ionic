import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPreloadingStrategy } from './app-preloading.module';
import { AuthenticationGuard } from './core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/auth/login/login.module#LoginModule',
    data: {title: '', preload: false, delay: true}
  },
  {
    path: 'register',
    loadChildren: './pages/auth/register/register.module#RegisterPageModule',
    data: {title: '', preload: false, delay: true}
  },
  {
    path: 'forgot-password',
    loadChildren:
      './pages/auth/forgot-password/forgot-password.module#ForgotPasswordPageModule',
      data: {title: '', preload: false, delay: true}
  },
  // {
  //   path: 'home',
  //   loadChildren: './pages/home/home.module#HomePageModule',
  //   data: {title: 'Home', preload: true, delay: false}
  // },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutModule',
    data: {title: 'About', preload: false, delay: true}
  },
  {
    path: "dashboard",
    loadChildren: "./pages/dashboard/dashboard.module#DashboardPageModule",
    data: {title: 'Home', preload: true, delay: false},
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
