import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-modalresumo',
  templateUrl: './modalresumo.page.html',
  styleUrls: ['./modalresumo.page.scss'],
})
export class ModalresumoPage implements OnInit {

  @Input() livro: string;
  @Input() resumo: string;
  @Input() id: string;
  @Input() idAutor: string;

  autor='' ;
  constructor(
    public modalCtrl: ModalController,
    public booksService: BooksServiceService
  ) { }

  ngOnInit() {
    this.getNome();
  }

  dismiss(){
    this.modalCtrl.dismiss({
      dismiss: true
    });

  }

  getImageUrl(){
    return 'https://picsum.photos/id/'+this.id+'/400/400';
  }

  getNome(){
    this.booksService.getNomeAutorById(this.idAutor).subscribe( (usuario) => {
      this.autor = usuario.nome;
      console.log(usuario);
    });
  }

}
