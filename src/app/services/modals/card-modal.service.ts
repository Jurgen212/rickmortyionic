import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardModalService {

  constructor() { }
  
  private isOpenModal = new BehaviorSubject<any>({isOpen: false, data: {}});
  isOpenModal$ = this.isOpenModal.asObservable();

  setModal(isOpen: boolean, data: any) {
    this.isOpenModal.next({isOpen, data});
  }
}
