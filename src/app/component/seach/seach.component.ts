import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrls: ['./seach.component.scss'],
})
export class SeachComponent  implements OnInit {

  constructor( private characterServ: CharactersService, private locationsServ: LocationsService) { }
  results:any = []
  resultsLocations: any = []

  ngOnInit() {
    console.log()
  }

  getCharactersByName(name:string){

    let infoInicial: any[] = []
    let infoInicialLocations: any[] = []


    this.characterServ.getCharactersByName(name).subscribe( (data) => {
      data.results.forEach((element: any) => {
        infoInicial.push(element)
      });
      this.results = infoInicial
    }, (error) => {
      this.results = []
    })

    this.locationsServ.getLocationsByName(name).subscribe( (data) => {
      data.results.forEach((element: any) => {
        infoInicialLocations.push(element)
      });
      this.resultsLocations = infoInicialLocations
    }, (error) => {
      this.resultsLocations = []
    })
  }

  handleInput(event:string | null | undefined ){ 

    if(event === null || event === undefined){
      return
    }

    const query = event.toLowerCase();
    if(query.length > 2){
      this.getCharactersByName(query)
    }
  }
}
