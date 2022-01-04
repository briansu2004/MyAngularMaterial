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
import { LicConditions, LicPlaces, LicTypes } from 'src/app/shared/constants';
import { LoaderService } from 'src/app/services/loader.service';
import { CyfsaSearchCriteria } from 'src/app/models/search_results';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-searchodsheader',
  templateUrl: './searchodsheader.component.html',
  styleUrls: ['./searchodsheader.component.css'],
})
export class SearchodsheaderComponent implements OnInit, AfterViewInit {
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
  public licPlace = '';
  public licPhone = '';
  public licCondition = '';

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

  licTypes = LicTypes;
  licPlaces = LicPlaces;
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

  onReset() {
    console.log('[onReset]');

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
      Number(!!cyfsaSearchCriteria.licPlace) +
      Number(!!cyfsaSearchCriteria.licPhone) +
      Number(!!cyfsaSearchCriteria.licCondition);

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
    //this.dataSource.filter = '';

    console.log('Loading...');
    this.loaderService.isLoading.next(true);

    // Using mock by JSON-Server or real API
    this.licenceService.getLicences().subscribe(
      async (data: any) => {
        console.log('[onSubmit] data: ', data);
        if (data) {
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

  ngOnInit(): void {
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

    this.searchFormInit();
  }

  getFilterPredicate() {
    return (row: Licence, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const licNo = filterArray[0];
      const licType = filterArray[1];
      const licName = filterArray[2];
      const licPlace = filterArray[3];
      const licPhone = filterArray[4];
      const licCondition = filterArray[5];

      const matchFilter = [];

      // Fetch data from row
      const columnLicNo = row.licNo;
      const columnLicType = row.licType;
      const columnLicName = row.licName;
      const columnLicPlace = row.licPlace;
      const columnLicPhone = row.licPhone;
      const columnLicCondition = row.licCondition;

      // verify fetching data by our searching values
      const customFilterLicNo = columnLicNo
        .toString()
        .toLowerCase()
        .includes(licNo);
      const customFilterLicType = columnLicType.toLowerCase().includes(licType);
      const customFilterLicName = columnLicName.toLowerCase().includes(licName);
      const customFilterLicPlace = columnLicPlace
        .toLowerCase()
        .includes(licPlace);
      const customFilterLicPhone = columnLicPhone
        .toLowerCase()
        .includes(licPhone);
      const customFilterLicCondition = columnLicCondition
        .toLowerCase()
        .includes(licCondition);

      // push boolean values into array
      matchFilter.push(customFilterLicNo);
      matchFilter.push(customFilterLicType);
      matchFilter.push(customFilterLicName);
      matchFilter.push(customFilterLicPlace);
      matchFilter.push(customFilterLicPhone);
      matchFilter.push(customFilterLicCondition);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  searchFormInit() {
    this.form = new FormGroup({
      licNo: new FormControl('', Validators.pattern('^[0-9 ]+$')),
      licType: new FormControl('', Validators.pattern("^[a-zA-Z0-9' ]+$")),
      licName: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$')),
      licPlace: new FormControl('', Validators.pattern("^[a-zA-Z0-9' ]+$")),
      //^[0-9][0-9-]+[0-9]$
      //^((\\+91-?)|0)?[0-9]{10}$
      //^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$
      licPhone: new FormControl(
        '',
        Validators.pattern('^(([0-9]{3})|[0-9]{3}-)[0-9]{3}-[0-9]{4}$')
      ),
      licCondition: new FormControl('', Validators.pattern("^[a-zA-Z0-9' ]+$")),
    });
  }

  applyFilter() {
    const formLicNo = this.form.get('licNo');
    const formLicType = this.form.get('licType');
    const formLicName = this.form.get('licName');
    const formLicPlace = this.form.get('licPlace');
    const formLicPhone = this.form.get('licPhone');
    const formLicCondition = this.form.get('licCondition');

    this.licNo =
      formLicNo === null ||
      formLicNo.value === undefined ||
      formLicNo.value === null ||
      formLicNo.value === ''
        ? ''
        : formLicNo.value.toString();
    this.licType =
      formLicType === null ||
      formLicType.value === undefined ||
      formLicType.value === null ||
      formLicType.value === ''
        ? ''
        : formLicType.value.toString();
    this.licName =
      formLicName === null ||
      formLicName.value === undefined ||
      formLicName.value === null ||
      formLicName.value === ''
        ? ''
        : formLicName.value.toString();
    this.licPlace =
      formLicPlace === null ||
      formLicPlace.value === undefined ||
      formLicPlace.value === null ||
      formLicPlace.value === ''
        ? ''
        : formLicPlace.value.toString();
    this.licPhone =
      formLicPhone === null ||
      formLicPhone.value === undefined ||
      formLicPhone.value === null ||
      formLicPhone.value === ''
        ? ''
        : formLicPhone.value.toString();
    this.licCondition =
      formLicCondition === null ||
      formLicCondition.value === undefined ||
      formLicCondition.value === null ||
      formLicCondition.value === ''
        ? ''
        : formLicCondition.value.toString();

    // create string of our searching values and split if by '$'
    const filterValue =
      this.licNo +
      '$' +
      this.licType +
      '$' +
      this.licName +
      '$' +
      this.licPlace +
      '$' +
      this.licPhone +
      '$' +
      this.licCondition;
    console.log('filterValue: ', filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
