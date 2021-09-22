import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalresumoPageRoutingModule } from './modalresumo-routing.module';

import { ModalresumoPage } from './modalresumo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalresumoPageRoutingModule
  ],
  declarations: [ModalresumoPage]
})
export class ModalresumoPageModule {}
