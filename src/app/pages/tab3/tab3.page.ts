import { Component, OnInit, OnDestroy } from '@angular/core';
import { Result } from 'src/app/models/Characters';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  characters: Result[] = [];

  constructor(private localServ: LocalstorageService) {}

  ngOnInit(): void {
    this.getCharacters();

    this.localServ.isUpdatingStorage$.subscribe(() => {
      this.getCharacters();
    });
  } 

  getCharacters() {
    this.characters = this.localServ.getAllItems();
  }
}
