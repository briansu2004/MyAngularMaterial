import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BasicComponent } from './basic/basic.component';
import { StylingComponent } from './styling/styling.component';
import { RowTemplateComponent } from './row-template/row-template.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SortingComponent } from './sorting/sorting.component';
import { PagesortComponent } from './pagesort/pagesort.component';
import { FilterComponent } from './filter/filter.component';
import { SearchfilterComponent } from './searchfilter/searchfilter.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'styling', component: StylingComponent },
  { path: 'row-template', component: RowTemplateComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'sorting', component: SortingComponent },
  { path: 'pagesort', component: PagesortComponent },
  { path: 'searchfilter', component: SearchfilterComponent },
  { path: 'filter', component: FilterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  PagenotfoundComponent,
  BasicComponent,
  StylingComponent,
  RowTemplateComponent,
  PaginationComponent,
  SortingComponent,
  PagesortComponent,
  SearchfilterComponent,
  FilterComponent,
];
