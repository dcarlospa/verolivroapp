import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksServiceService } from '../services/books-service.service';
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
    private booksService: BooksServiceService,
    ) {
      this.booksService.loadUserId();
  }




  ionViewWillEnter(){
    this.resumosTop$ = this.booksService.getResumos('tops');
    this.resumosRecentes$ = this.booksService.getResumos('recentes');
    this.meusResumos$ = this.booksService.getResumos('meus');
  }

  abrirMeuResumo(resumo) {
    console.log('Abrindo o resumo ', resumo);
  }

  getImageById(id){
    return 'https://picsum.photos/id/'+id+'/200/200';
  }

}
