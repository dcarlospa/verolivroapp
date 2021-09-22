import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalresumoPage } from '../modalresumo/modalresumo.page';
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
    public modalController: ModalController
    ) {
      this.booksService.loadUserId();
  }




  ionViewWillEnter(){
    this.resumosTop$ = this.booksService.getResumos('tops');
    this.resumosRecentes$ = this.booksService.getResumos('recentes');
    this.meusResumos$ = this.booksService.getResumos('meus');
  }

  async abrirMeuResumo(resumo) {
    console.log('Abrindo o resumo ', resumo);

    const modal = await this.modalController.create({
      component: ModalresumoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        livro: resumo.livro.nome,
        resumo: resumo.texto,
        id: resumo.livro.id,
        idAutor: resumo.autor

      }
    });
    return await modal.present();


  }

  getImageById(id){
    return 'https://picsum.photos/id/'+id+'/200/200';
  }

}
