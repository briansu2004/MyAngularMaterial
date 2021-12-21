import { Time } from '@angular/common';

export interface SearchCriteria {
  licNo: string;
  licType: string;
  licName: string;
  licPlace: string;
  licPhone: string;
  licCondition: string;
}

export interface CyfsaSearchCriteria extends SearchCriteria {
  licId: number;
  //ts: Time;
}
