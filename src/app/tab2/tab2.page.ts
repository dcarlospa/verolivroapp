import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  resumosTop$: Observable<any[]>;
  resumosRecentes$: Observable<any[]>;
  meusResumos$: Observable<any[]>;

  constructor(
    private authService: AuthService,
    ) {

  }




  ionViewWillEnter(){
    this.resumosTop$ = this.authService.getResumos('tops');
    this.resumosRecentes$ = this.authService.getResumos('recentes');
    this.meusResumos$ = this.authService.getResumos('meus');
  }

  abrirMeuResumo(resumo) {
    console.log('Abrindo o resumo ', resumo);
  }

  getImageById(id){
    return 'https://picsum.photos/id/'+id+'/200/200';
  }

}
