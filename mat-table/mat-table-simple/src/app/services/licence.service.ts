import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URLs } from '../shared/URLs';
import { Licence } from '../models/Licence';

@Injectable({
  providedIn: 'root',
})
export class LicenceService {
  constructor(private http: HttpClient) {}

  // //licSearchCriteria: LicSearchCriteria
  // getLicences() {
  //   // let params = new HttpParams().set(
  //   //   'licSearchCriteria',
  //   //   JSON.stringify(licSearchCriteria)
  //   // );
  //   console.log(
  //   return this.http.get<LicSearchResponse>(URLs.LICENCE_ENDPOINT, {
  //     // params,
  //   });
  // }

  getLicences() {
    console.log('[getLicences] ', URLs.LICENCE_ENDPOINT);
    return this.http.get<Licence>(URLs.LICENCE_ENDPOINT, {});
  }
}
