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
import { SearchComponent } from './components/search/search.component';
import { FilterpredicateComponent } from './components/filterpredicate/filterpredicate.component';
import { OdsComponent } from './components/ods/ods.component';
import { OdsheaderdefaultComponent } from './components/odsheaderdefault/odsheaderdefault.component';
import { OdsheaderontarioComponent } from './components/odsheaderontario/odsheaderontario.component';
import { OdsfooterdefaultComponent } from './components/odsfooterdefault/odsfooterdefault.component';
import { NewhomeComponent } from './components/newhome/newhome.component';
import { MockupComponent } from './components/mockup/mockup.component';
import { SearchodsheaderComponent } from './components/searchodsheader/searchodsheader.component';

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
  { path: 'search', component: SearchComponent },
  { path: 'flterpredicate', component: FilterpredicateComponent },
  { path: 'odsheaderdefault', component: OdsheaderdefaultComponent },
  { path: 'odsheaderontario', component: OdsheaderontarioComponent },
  { path: 'odsfooterdefault', component: OdsfooterdefaultComponent },
  { path: 'ods', component: OdsComponent },
  { path: 'newhome', component: NewhomeComponent },
  { path: 'mockup', component: MockupComponent },
  { path: 'searchodsheader', component: SearchodsheaderComponent },

  { path: '', redirectTo: 'searchodsheader', pathMatch: 'full' },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
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
  SearchComponent,
  FilterpredicateComponent,
  OdsComponent,
  OdsheaderdefaultComponent,
  OdsheaderontarioComponent,
  OdsfooterdefaultComponent,
  NewhomeComponent,
  MockupComponent,
  SearchodsheaderComponent,
];
