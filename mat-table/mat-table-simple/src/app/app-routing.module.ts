import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { BasicComponent } from './components/basic/basic.component';
import { StylingComponent } from './components/styling/styling.component';
import { RowTemplateComponent } from './components/row-template/row-template.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { PagesortComponent } from './components/pagesort/pagesort.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchfilterComponent } from './components/searchfilter/searchfilter.component';
import { SelectionComponent } from './components/selection/selection.component';
import { FooterComponent } from './components/footer/footer.component';
import { StickyComponent } from './components/sticky/sticky.component';
import { FlexComponent } from './components/flex/flex.component';
import { MockComponent } from './components/mock/mock.component';
import { AsyncLoadComponent } from './components/async-load/async-load.component';

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
  { path: 'selection', component: SelectionComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'sticky', component: StickyComponent },
  { path: 'flex', component: FlexComponent },
  { path: 'mock', component: MockComponent },
  { path: 'asyncload', component: AsyncLoadComponent },
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
  SelectionComponent,
  FooterComponent,
  StickyComponent,
  FlexComponent,
  MockComponent,
  AsyncLoadComponent,
];
