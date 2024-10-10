import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Welcome } from '../models/Characters';
import { urlRickMorty } from '../config/url.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  baseUrl = urlRickMorty + 'character';
  constructor( private Http: HttpClient) { }

  getCharacters( page: Number | null): Observable<Welcome>{
    return this.Http.get<Welcome>(this.baseUrl + `?page=${page}`);
  }

  getCharacterById( id: Number ): Observable<any>{
    return this.Http.get<any>(this.baseUrl + `/${id}`);
  }

  getCharactersByName(name:string): Observable<any> {
    return this.Http.get<any>(this.baseUrl + `/?name=${name}`);
  }

  getDataByUrl(url: string): Observable<any>{
    return this.Http.get<any>(url);
  }
}
