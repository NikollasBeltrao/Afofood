import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RequestsService } from 'src/services/requests.service';

@Injectable()
export class RequestsResolver implements Resolve<any> {
  
  constructor(private requestService: RequestsService) {}

  resolve() {
    return this.requestService.getRequestsWhere();
  }
}
