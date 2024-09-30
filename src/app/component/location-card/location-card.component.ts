import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Characters';
import { CharactersService } from '../../services/characters.service';
import { ResidentsService } from 'src/app/services/residents.service';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent  implements OnInit {

  constructor( private residentServ: ResidentsService) { }
  @Input() item !: Result;

  show: boolean = false;
  personajes: any[] = [];

  ngOnInit() {
    this.callResidents();
  }

  changeShow(){
    this.show = !this.show;
  }

  callResidents(){
    this.item.residents?.forEach( resident => {
      this.residentServ.getResidents(resident).subscribe( (resp: any) => {
        this.personajes.push(resp);
      })
    })
  }
}
