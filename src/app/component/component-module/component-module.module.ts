import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ImageListComponent } from '../image-list/image-list.component';
import { IonicModule } from '@ionic/angular';
import { LocationCardComponent } from '../location-card/location-card.component';
import { ModalCardComponent } from '../modal-card/modal-card.component';
import { SeachComponent } from '../seach/seach.component';




@NgModule({
  declarations: [
    CardComponent,
    ImageListComponent,
    LocationCardComponent,
    ModalCardComponent,
    SeachComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    CardComponent,
    ImageListComponent,
    LocationCardComponent,
    ModalCardComponent,
    SeachComponent
  ]
})
export class ComponentModuleModule { }
