import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Welcome } from '../models/Characters';
import { Observable } from 'rxjs';
import { urlRickMorty } from '../config/url.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor( private Http: HttpClient) { }
  baseUrl = urlRickMorty + 'location';

  getLocations(page: Number):Observable<Welcome>{
    return this.Http.get<Welcome>( this.baseUrl + '?page='+page);
  }

  getLocationsByName(name:string): Observable<any>{  
    return this.Http.get<any>(this.baseUrl + `/?name=${name}`);
  }
}
