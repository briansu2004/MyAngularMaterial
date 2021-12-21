import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Licence } from 'src/app/models/Licence';
import { LicenceService } from 'src/app/services/licence.service';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faAngleDoubleUp,
  faAngleDown,
  faAngleUp,
  faBan,
  faExclamation,
  faFilter,
  faQuestionCircle,
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { LicConditions } from 'src/app/shared/constants';
import { LoaderService } from 'src/app/services/loader.service';
import { CyfsaSearchCriteria } from 'src/app/models/search_results';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'licId',
    'licNo',
    'licType',
    'licName',
    'licPlace',
    'licPhone',
    'licCondition',
  ];

  dataSource = new MatTableDataSource<Licence>();

  form!: FormGroup;

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faExclamation = faExclamation;
  faQuestionCircle = faQuestionCircle;
  faAngleDoubleUp = faAngleDoubleUp;
  faFilter = faFilter;
  faBan = faBan;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  licConditions = LicConditions;

  hasExpanded: boolean = false;
  searchClicked: boolean = false;
  items = 0;
  invalidSearch: boolean = false;
  errorKey: string = '';
  successKey: string = '';
  searchColor = '';
  resetColor = '';

  constructor(
    private fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
    private licenceService: LicenceService,
    public loaderService: LoaderService
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild('resulttable')
  target!: ElementRef;

  // @ViewChild(MatSort) filterValue!: string;

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // applyFilter(event: any) {
  //   if (event.target && event.target.value && event.target.value !== '') {
  //     this.dataSource.filter = event.target.value.trim().toLowerCase();
  //   }
  // }

  onReset() {
    console.log('[onReset]');

    // window.sessionStorage.removeItem('CASSEARCH');
    // window.sessionStorage.removeItem('CASSEARCHRESULT');
    // window.sessionStorage.removeItem('CASFILTREDSEARCHRESULT');
    // window.sessionStorage.removeItem('CASSEARCHSORTINFORMATION');
    // this.searchClicked = false;
    // this.filtered = false;
    // this.filteredData = null;
    // this.invalidSearch = false;
    // this.dataSource.data = [];
    // this.items = 0;
    // this.filtered = false;
    // this.successKey = 'success.reset';

    window.sessionStorage.removeItem('CYFSASEARCH');
    this.invalidSearch = false;
    this.dataSource.data = [];
    this.searchClicked = false;
    this.errorKey = '';
    this.successKey = '';

    this.form.reset();
  }

  onSubmit() {
    console.log('[onSubmit]');

    const cyfsaSearchCriteria: CyfsaSearchCriteria = {
      licId: -1,
      licNo: this.form.value.licNo,
      licType: this.form.value.licType,
      licName: this.form.value.licName,
      licPlace: this.form.value.licPlace,
      licPhone: this.form.value.licPhone,
      licCondition: this.form.value.licCondition,
    };

    let coreCriteriaFieldCount: number =
      Number(!!cyfsaSearchCriteria.licNo) +
      Number(!!cyfsaSearchCriteria.licType) +
      Number(!!cyfsaSearchCriteria.licName) +
      Number(!!cyfsaSearchCriteria.licPlace);

    // Need at least one search criteria
    if (coreCriteriaFieldCount == 0) {
      this.invalidSearch = true;
      //this.errorKey = 'error.search.FieldRequired';
      this.errorKey = 'Please select at least one search criterion';
      this.successKey = '';
      return;
    }

    this.searchClicked = true;
    this.errorKey = '';
    this.successKey = ''; //'Search criteria: ' ;

    window.sessionStorage.setItem(
      'CYFSASEARCH',
      JSON.stringify(cyfsaSearchCriteria)
    );

    this.dataSource.data = [];
    this.dataSource.filter = '';

    console.log('Loading...');
    this.loaderService.isLoading.next(true);

    // Using mock by JSON-Server or real API
    this.licenceService.getLicences().subscribe(
      async (data: any) => {
        console.log('[onSubmit] data: ', data);
        if (data) {
          this.dataSource.data = data;

          if (!!cyfsaSearchCriteria.licNo) {
            this.dataSource.filter += cyfsaSearchCriteria.licNo
              .trim()
              .toLowerCase();
          }

          if (!!cyfsaSearchCriteria.licType) {
            this.dataSource.filter += cyfsaSearchCriteria.licType
              .trim()
              .toLowerCase();
          }

          if (!!cyfsaSearchCriteria.licName) {
            this.dataSource.filter += cyfsaSearchCriteria.licName
              .trim()
              .toLowerCase();
          }

          if (!!cyfsaSearchCriteria.licPlace) {
            this.dataSource.filter += cyfsaSearchCriteria.licPlace
              .trim()
              .toLowerCase();
          }

          console.log('filter: ', this.dataSource.filter);

          console.log('Loaded!');
          this.loaderService.isLoading.next(false);
        }
      },
      (err: any) => {
        console.log('[onSubmit] err: ', err);
        this.loaderService.isLoading.next(false);
      }
    );
  }

  ngOnInit(): void {
    // let searchCriteria: CyfsaSearchCriteria;

    // if (window.sessionStorage.getItem('CYFSASEARCH')) {
    //   //searchCriteria = JSON.parse(window.sessionStorage.getItem('CYFSASEARCH'));
    //   searchCriteria = window.sessionStorage.getItem('CYFSASEARCH');
    // }

    // window.sessionStorage.setItem(
    //   'MYCASALERTSRESULTS',
    //   JSON.stringify(this.searchResults)
    // );

    // const searchCriteria: cyfsaSearchCriteria = JSON.parse(
    //   window.sessionStorage.getItem('CASSEARCH')
    // );

    const searchCriteria1 = window.sessionStorage.getItem('CYFSASEARCH') as
      | string
      | null;

    if (searchCriteria1) {
      const searchCriteria = JSON.parse(searchCriteria1) as CyfsaSearchCriteria;

      if (searchCriteria) {
        this.form = this.fb.group({
          licId: searchCriteria?.licId,
          licNo: searchCriteria?.licNo,
          licType: searchCriteria?.licType,
          licName: searchCriteria?.licName,
          licPlace: searchCriteria?.licPlace,
          licPhone: searchCriteria?.licPhone,
          licCondition: searchCriteria?.licCondition,
        });
      }
    } else {
      this.dataSource.data = [];

      this.form = this.fb.group({
        licId: '',
        licNo: '',
        licType: '',
        licName: '',
        licPlace: '',
        licPhone: '',
        licCondition: '',
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
