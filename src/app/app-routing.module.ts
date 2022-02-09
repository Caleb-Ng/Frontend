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
    {path : '' , redirectTo: '/home', pathMatch: 'full'},
    {
      path: "home",
      loadChildren: () => import("./home/home.module").then((m) => m.HomeModule)  
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    },
    {
      path: "logInSuccess",
      loadChildren: () => import("./success-log-in-home/success-log-in-home.module").then((m) => m.SuccessLogInHomeModule)  
    },
    {
      path: "productdetails",
      loadChildren: () => import("./product-details/product-details.module").then((m) => m.ProductDetailsModule)  
    },
    {
      path: "dashboard",
      loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule)  
    },
    {
      path: "create-drone",
      loadChildren: () => import("./create-drone/create-drone.module").then((m) => m.CreateDroneModule)  
    },
    {
      path: "drone/:id",
      loadChildren: () => import("./drone-details/drone-details.module").then((m) => m.DroneDetailsModule)  
    },
    {
      path: "profile",
      loadChildren: () => import("./profile/profile.module").then((m) => m.ProfileModule)
    },
    {
      path: "tutorial",
      loadChildren: () => import("./tutorial/tutorial.module").then((m) => m.TutorialModule)
    },
    {
      path: "account/activate",
      loadChildren: () => import("./activate/activate.module").then((m) => m.ActivateModule)
    },
    {
      path: '**',
      redirectTo: '/home'
    }
  
  ]
  )
  
  
  
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
