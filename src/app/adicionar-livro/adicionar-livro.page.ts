import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BooksServiceService } from '../services/books-service.service';
import { Livro } from '../modelos/livro';

@Component({
  selector: 'app-adicionar-livro',
  templateUrl: './adicionar-livro.page.html',
  styleUrls: ['./adicionar-livro.page.scss'],
})
export class AdicionarLivroPage implements OnInit {

  @Input() estado: string;

  livro: Livro = {nome:'', autor:'', dono: '', estado:'', totalPaginas:0,id:0};

  constructor(
    public modalCtrl: ModalController,
    public booksService: BooksServiceService
  ) { }

  ngOnInit() {
  }

  cancelar(){
    this.modalCtrl.dismiss({
      dismiss: true
    });
  }

  salvar(){
    this.livro.estado = this.estado;
    this.livro.dono = this.booksService.userId;
    this.booksService.adicionarLivro(this.livro);
    this.modalCtrl.dismiss({
      dismiss: true
    });
  }

}
