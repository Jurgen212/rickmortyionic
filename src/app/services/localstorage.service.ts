import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  private isUpdatingStorage = new BehaviorSubject<any>(true);
  isUpdatingStorage$ = this.isUpdatingStorage.asObservable();

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    this.setUpdatingStorage()
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }


  getItemQR(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.setUpdatingStorage()
  }

  getAllItems() {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      if( localStorage.key(i) !== 'qrpeople') items.push(JSON.parse( localStorage.getItem(localStorage.key(i) || '{}')!));
    }
    return items;
  } 

  setUpdatingStorage() {
    this.isUpdatingStorage.next(true);
  }
}
