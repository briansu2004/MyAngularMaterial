import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoadComponent } from './components/load/load.component';

const routes: Routes = [
  //{ path: '**', redirectTo: '/home' },
  //{ path: '**', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nav', component: NavComponent },
  { path: 'load', component: LoadComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  PagenotfoundComponent,
  HomeComponent,
  NavComponent,
  LoadComponent,
];
