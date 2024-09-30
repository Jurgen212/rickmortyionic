import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentsService {
  constructor( private Http: HttpClient) { }

  getResidents( url: string ): Observable<any>{
    return this.Http.get<any>(url);
  }
}
