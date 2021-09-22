import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalresumoPage } from './modalresumo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalresumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalresumoPageRoutingModule {}
