import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Result } from 'src/app/models/Characters';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { CardModalService } from 'src/app/services/modals/card-modal.service';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss'],
})
export class ModalCardComponent  implements OnInit {

  constructor( private modalCardServ: CardModalService, private localServ: LocalstorageService) { }
  data!: Result;
  _isModalOpen: boolean = false;

  

  ngOnInit() {
    this.modalCardServ.isOpenModal$.subscribe((info) => {
      this.isModalOpen = info.isOpen;
      this.data = info.data;
    })
  }

  close(isOpen: boolean) {
    this.modalCardServ.setModal(false, {});
  }

  modalDismiss(){
    this.modalCardServ.setModal(false, {});
  }

  @Input()
  set isModalOpen(value: boolean) {
    if (this._isModalOpen !== value) {
      this._isModalOpen = value;
    }
  }

  get isModalOpen(): boolean {
    return this._isModalOpen;
  }


  addItemToFavorites(){
    this.localServ.setItem(this.data.id + "", this.data);
  }

  removeItemToFavorites(){
    this.localServ.removeItem(this.data.id + "");
  }


  knowIfItemExistInFavorites():boolean{
    const localHistory = this.localServ.getItem(this.data.id + "");
    if(localHistory.id === this.data.id){
      return true
    }
    return false
  }
}
