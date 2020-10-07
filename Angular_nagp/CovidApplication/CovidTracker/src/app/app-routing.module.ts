import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsComponent } from './components/news/news.component';
import { PrecautionsComponent } from './components/precautions/precautions.component';
import { StatesComponent } from './components/states/states.component';
import { DistrictsComponent } from './components/districts/districts.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StatesComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StatesComponent,
      },
      {
        path: ':id',
        component: DistrictsComponent,
      },
    ],
  },
  { path: 'news', component: NewsComponent },
  { path: 'precautions', component: PrecautionsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
