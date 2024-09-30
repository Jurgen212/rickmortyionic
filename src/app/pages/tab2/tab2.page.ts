import { Component, OnInit } from '@angular/core';
import { Result, Welcome } from 'src/app/models/Characters';
import { LocationsService } from '../../services/locations.service';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  locations: Result[] = []
  pageNumber = 1;
  next: string | null = null;
  prev: string | null = null;
  constructor( private locationsService: LocationsService, private characterServ: CharactersService) {}


  ngOnInit(): void {
    this.callLocations();
  }


  callLocations(){
    this.locationsService.getLocations(this.pageNumber).subscribe( (resp: Welcome) => {
      this.next = resp.info.next
      this.prev = resp.info.prev
      resp.results.forEach( location => {

        if (location.residents && location.residents.length > 0) {
          this.addLocation(location);
        }
      })
    })
  }

  nextPage(){
    this.pageNumber++;
    this.locations = [];
    this.callLocations();
  }

  prevPage(){
    this.pageNumber--;
    this.locations = [];
    this.callLocations();
  }


  addLocation(character: Result){
    this.locations.push(character);
  }
}
