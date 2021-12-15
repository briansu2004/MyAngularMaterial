import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // loadingSubject: BehaviorSubject<boolean>;

  // loading$: Observable<boolean>;

  // constructor() {
  //   this.loadingSubject = new BehaviorSubject<boolean>(false);

  //   this.loading$ = this.loadingSubject.asObservable();
  // }

  // show() {
  //   console.log('[show] loading$: ', this.loading$);
  //   this.loadingSubject.next(true);
  // }

  // hide() {
  //   console.log('[hide] loading$: ', this.loading$);
  //   this.loadingSubject.next(false);
  // }

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}
}
