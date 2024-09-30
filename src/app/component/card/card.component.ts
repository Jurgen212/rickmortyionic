import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Characters';
import { CardModalService } from 'src/app/services/modals/card-modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() data !: Result;
  constructor( private modalCardServ: CardModalService ) { }

  showModal(){
    this.modalCardServ.setModal(true, this.data);
  }
  
  ngOnInit() {
    console.log();
  }
}
