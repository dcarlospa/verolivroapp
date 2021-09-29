import { Component } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AdicionarLivroPage } from '../adicionar-livro/adicionar-livro.page';
import { AuthService } from '../services/auth.service';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOpts = {
    spaceBetween: 5,
    slidesPerView: 2.3
  };

  /*
  {
    nome: string,
    autor: string,
    totalPaginas: number,
    paginaAtual: number,
    estado: string,
    dono: userId
  }
  www.servidordeimagensdogeorge.com.br/id
  */
  livrosLendo$: Observable<any[]>;
  livrosLidos$: Observable<any[]>;
  livrosLerei$: Observable<any[]>;

  constructor(
    public alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    private booksService: BooksServiceService,
    private modalController: ModalController
    ) {
    if(this.authService.userId===''){
      this.navCtrl.navigateRoot('login');
    }
  }

  ionViewWillEnter(){
    this.booksService.loadUserId();
    this.livrosLendo$ = this.booksService.getLivros('lendo');
    this.livrosLidos$ = this.booksService.getLivros('lido');
    this.livrosLerei$ = this.booksService.getLivros('lerei');
  }

  getImageById(id){
    return 'https://picsum.photos/id/'+id+'/200/300';
  }

  async atualizaLivro(livro){
    console.log(livro);

    const alert = await this.alertController.create({
      header: livro.nome,
      message: 'Qual sua página atual?',
      inputs: [
        {
          name: 'paginaAtualInput',
          type: 'number',
          min: 0,
          max: Number(livro.totalPaginas),
          value: Number(livro.paginaAtual)
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Terminei',
          handler: () => {
            livro.estado = 'lido';
            livro.paginaAtual = livro.totalPaginas;
            livro.nota=0;
            this.booksService.updateLivro(livro);
          }
        }, {
          text: 'Salvar',
          handler: data => {
            console.log(data);
            livro.paginaAtual = data.paginaAtualInput;
            if(data.paginaAtualInput > livro.totalPaginas){
              livro.paginaAtual = livro.totalPaginas;
            }
            else if(data.paginaAtualInput < 0) {
              livro.paginaAtual = 0;
            }
            this.booksService.updateLivro(livro);
          }
        }
      ]
    });

    await alert.present();
  }

  comecarLivro(livro){
    livro.estado='lendo';
    livro.paginaAtual=0;
    this.booksService.updateLivro(livro);
  }

  async adicionarLivro(estado){
    console.log('Adicionando Livro');

    const modal = await this.modalController.create({
      component: AdicionarLivroPage,
      cssClass: 'my-custom-class',
      componentProps: {
        estado,
      }
    });
    return await modal.present();
  }

  async avaliarLivro(livro){
      const alert = await this.alertController.create({
        header: 'Radio',
        inputs: [
          {
            name: 'radio1',
            type: 'radio',
            label: '1',
            value: 1,
            handler: () => {
              console.log('Nota 1');
            }
          },
          {
            name: 'radio2',
            type: 'radio',
            label: '2',
            value: 2,
            handler: () => {
              console.log('Radio 2 selected');
            }
          },
          {
            name: 'radio3',
            type: 'radio',
            label: '3',
            value: 3,
            handler: () => {
              console.log('Radio 3 selected');
            }
          },
          {
            name: 'radio4',
            type: 'radio',
            label: '4',
            value: 4,
            handler: () => {
              console.log('Radio 4 selected');
            }
          },
          {
            name: 'radio5',
            type: 'radio',
            label: '5',
            value: 5,
            handler: () => {
              console.log('Radio 5 selected');
            }
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok', data);
              livro.nota = data;
              this.booksService.updateLivro(livro);
            }
          }
        ]
      });

      await alert.present();
  }

}
