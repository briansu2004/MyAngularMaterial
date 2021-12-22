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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  selector: 'app-filterpredicate',
  templateUrl: './filterpredicate.component.html',
  styleUrls: ['./filterpredicate.component.css'],
})
export class FilterpredicateComponent implements OnInit, AfterViewInit {
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

  public form!: FormGroup;

  public licNo = '';
  public licType = '';
  public licName = '';

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

    this.invalidSearch = false;
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
          // if (!!cyfsaSearchCriteria.licNo) {
          //   this.dataSource.filter += cyfsaSearchCriteria.licNo
          //     .trim()
          //     .toLowerCase();
          // }

          // if (!!cyfsaSearchCriteria.licType) {
          //   this.dataSource.filter += cyfsaSearchCriteria.licType
          //     .trim()
          //     .toLowerCase();
          // }

          // if (!!cyfsaSearchCriteria.licName) {
          //   this.dataSource.filter += cyfsaSearchCriteria.licName
          //     .trim()
          //     .toLowerCase();
          // }

          // if (!!cyfsaSearchCriteria.licPlace) {
          //   this.dataSource.filter += cyfsaSearchCriteria.licPlace
          //     .trim()
          //     .toLowerCase();
          // }

          // console.log('filter: ', this.dataSource.filter);

          //this.dataSource.filterPredicate = this.createFilter();

          // console.log('cyfsaSearchCriteria: ', cyfsaSearchCriteria);
          // console.log(
          //   '!!cyfsaSearchCriteria.licNo: ',
          //   !!cyfsaSearchCriteria.licNo
          // );

          // this.dataSource.filterPredicate = function (data: Licence): boolean {
          //   console.log(
          //     'data.licNo.toLowerCase().includes(cyfsaSearchCriteria.licNo.toLowerCase()): ',
          //     data.licNo
          //       .toLowerCase()
          //       .includes(cyfsaSearchCriteria.licNo.toLowerCase())
          //   );

          //   return (
          //     !!cyfsaSearchCriteria.licNo &&
          //     data.licNo
          //       .toLowerCase()
          //       .includes(cyfsaSearchCriteria.licNo.toLowerCase()) &&
          //     !!cyfsaSearchCriteria.licNo &&
          //     data.licType
          //       .toLowerCase()
          //       .includes(cyfsaSearchCriteria.licType.toLowerCase()) &&
          //     !!cyfsaSearchCriteria.licNo &&
          //     data.licName
          //       .toLowerCase()
          //       .includes(cyfsaSearchCriteria.licName.toLowerCase()) &&
          //     !!cyfsaSearchCriteria.licNo &&
          //     data.licPlace
          //       .toLowerCase()
          //       .includes(cyfsaSearchCriteria.licPlace.toLowerCase())
          //   );
          // };

          //console.log('cyfsaSearchCriteria.licNo: ', cyfsaSearchCriteria.licNo);

          console.log('Loaded!');

          this.applyFilter();
          this.dataSource.filterPredicate = this.getFilterPredicate();

          console.log('Filtered!');

          this.dataSource.data = data;

          this.loaderService.isLoading.next(false);
        }
      },
      (err: any) => {
        console.log('[onSubmit] err: ', err);
        this.loaderService.isLoading.next(false);
      }
    );
  }

  licNoFilter = new FormControl('');
  licTypeFilter = new FormControl('');
  licNameFilter = new FormControl('');
  licPlaceFilter = new FormControl('');

  filterValues: any = {
    licNo: '',
    licType: '',
    licName: '',
    licPlace: '',
  };

  clearFilter() {
    this.licNoFilter.setValue('');
    this.licTypeFilter.setValue('');
    this.licNameFilter.setValue('');
    this.licPlaceFilter.setValue('');
  }

  private createFilter(): (licence: Licence, filter: string) => boolean {
    let filterFunction = function (licence: Licence, filter: string): boolean {
      //console.log('[createFilter] filter: ', filter);
      let searchTerms = JSON.parse(filter);

      return (
        licence.licNo.indexOf(searchTerms.licNo) !== -1 &&
        licence.licType.indexOf(searchTerms.licType) !== -1 &&
        licence.licName.indexOf(searchTerms.licName) !== -1 &&
        licence.licPlace.indexOf(searchTerms.licPlace) !== -1
      );
    };

    //console.log('filterFunction: ', filterFunction);
    return filterFunction;
  }

  private fieldListener(): void {
    this.licNoFilter.valueChanges.subscribe((licNo) => {
      this.filterValues.licNo = licNo;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.licTypeFilter.valueChanges.subscribe((licType) => {
      this.filterValues.licType = licType;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.licNameFilter.valueChanges.subscribe((licName) => {
      this.filterValues.licName = licName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.licPlaceFilter.valueChanges.subscribe((licPlace) => {
      this.filterValues.licPlace = licPlace;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    console.log(
      '[fieldListener] this.dataSource.filter',
      this.dataSource.filter
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

    const cyfsaSearchCriteria: CyfsaSearchCriteria = {
      licId: -1,
      licNo: this.form.value.licNo,
      licType: this.form.value.licType,
      licName: this.form.value.licName,
      licPlace: this.form.value.licPlace,
      licPhone: this.form.value.licPhone,
      licCondition: this.form.value.licCondition,
    };

    // this.dataSource.filterPredicate = function (data: Licence): boolean {
    //   console.log(
    //     'data.licNo.toLowerCase().includes(cyfsaSearchCriteria.licNo.toLowerCase()): ',
    //     data.licNo
    //       .toLowerCase()
    //       .includes(cyfsaSearchCriteria.licNo.toLowerCase())
    //   );

    //   return (
    //     !!cyfsaSearchCriteria.licNo &&
    //     data.licNo
    //       .toLowerCase()
    //       .includes(cyfsaSearchCriteria.licNo.toLowerCase()) &&
    //     !!cyfsaSearchCriteria.licNo &&
    //     data.licType
    //       .toLowerCase()
    //       .includes(cyfsaSearchCriteria.licType.toLowerCase()) &&
    //     !!cyfsaSearchCriteria.licNo &&
    //     data.licName
    //       .toLowerCase()
    //       .includes(cyfsaSearchCriteria.licName.toLowerCase()) &&
    //     !!cyfsaSearchCriteria.licNo &&
    //     data.licPlace
    //       .toLowerCase()
    //       .includes(cyfsaSearchCriteria.licPlace.toLowerCase())
    //   );
    // };

    //this.dataSource.filterPredicate = this.createFilter();

    // this.dataSource.filterPredicate = (data: Licence, filter: string) => {
    //   const dataStr = data.licNo; // + data.details.name + data.details.symbol + data.details.weight;

    //   filter = cyfsaSearchCriteria.licNo;

    //   console.log('filter: ', filter);

    //   //return dataStr.indexOf(cyfsaSearchCriteria.licNo) != -1;

    //   return data.licName.indexOf('z') != -1;
    // };

    //this.fieldListener();

    this.searchFormInit();
    // Filter predicate used for filtering table per different columns
    //this.dataSource.filterPredicate = this.getFilterPredicate();
  }

  getFilterPredicate() {
    return (row: Licence, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const licNo = filterArray[0];
      const licType = filterArray[1];
      const licName = filterArray[2];

      const matchFilter = [];

      // Fetch data from row
      const columnLicNo = row.licNo;
      const columnLicType = row.licType;
      const columnLicName = row.licName;

      // verify fetching data by our searching values
      const customFilterLicNo = columnLicNo
        .toString()
        .toLowerCase()
        .includes(licNo);
      const customFilterLicType = columnLicType.toLowerCase().includes(licType);
      const customFilterLicName = columnLicName.toLowerCase().includes(licName);

      // push boolean values into array
      matchFilter.push(customFilterLicNo);
      matchFilter.push(customFilterLicType);
      matchFilter.push(customFilterLicName);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  searchFormInit() {
    this.form = new FormGroup({
      licNo: new FormControl('', Validators.pattern('^[0-9 ]+$')),
      licType: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$')),
      licName: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$')),
    });
  }

  applyFilter() {
    const formLicNo = this.form.get('licNo');
    const formLicType = this.form.get('licType');
    const formLicName = this.form.get('licName');

    this.licNo =
      formLicNo === null || formLicNo.value === ''
        ? ''
        : formLicNo.value.toString();
    this.licType =
      formLicType === null || formLicType.value === ''
        ? ''
        : formLicType.value.toString();
    this.licName =
      formLicName === null || formLicName.value === ''
        ? ''
        : formLicName.value.toString();

    // create string of our searching values and split if by '$'
    const filterValue = this.licNo + '$' + this.licType + '$' + this.licName;
    console.log('filterValue: ', filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
