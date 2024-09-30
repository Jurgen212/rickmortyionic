import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Characters';
import { CharactersService } from 'src/app/services/characters.service';
import { Welcome } from '../../models/Characters';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  characters: Result[] = [];
  pageNumber = 1;
  next: string = "1";
  searching: boolean = true;
  loading: boolean = false; // Nueva bandera para evitar llamadas duplicadas

  constructor(private characterService: CharactersService) {}

  items: string[] = [];

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {

    if( this.next === null || this.next === undefined  || this.next === "null" ){
      return
    }

    this.characterService.getCharacters(this.pageNumber).subscribe((resp: Welcome) => {
      resp.results.forEach(character => {
        this.addCharacter(character);
      });
      this.pageNumber += 1;
    });
  }

  addCharacter(character: Result) {
    this.characters.push(character);
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
      
    }, 500);
  }


}
