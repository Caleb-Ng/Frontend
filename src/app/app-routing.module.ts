import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { headerRoute } from './header/header.route';

//const LAYOUT_ROUTES = [headerRoute];

/* const routes: Routes = [
  {path : '' , redirectTo: '/home' , pathMatch: 'full' },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule)  
  },
  ...LAYOUT_ROUTES,
];
 */
@NgModule({
  imports: [RouterModule.forRoot(
  [
    {path : '' , redirectTo: '/home' , pathMatch: 'full' },
    {
      path: "home",
      loadChildren: () => import("./home/home.module").then((m) => m.HomeModule)  
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },
    {
      path: "payment",
      loadChildren: () => import("./paymnet/payment.module").then((m) => m.PaymentModule)  
    }
  
  ]
  )
  
  
  
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
