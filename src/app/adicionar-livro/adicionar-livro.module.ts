import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarLivroPageRoutingModule } from './adicionar-livro-routing.module';

import { AdicionarLivroPage } from './adicionar-livro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarLivroPageRoutingModule
  ],
  declarations: [AdicionarLivroPage]
})
export class AdicionarLivroPageModule {}
