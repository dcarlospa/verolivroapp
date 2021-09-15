import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

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
    private navCtrl: NavController
    ) {
    if(this.authService.userId===''){
      this.navCtrl.navigateRoot('tabs/perfil');
    }
  }

  ionViewWillEnter(){
    this.livrosLendo$ = this.authService.getLivros('lendo');
    this.livrosLidos$ = this.authService.getLivros('lido');
    this.livrosLerei$ = this.authService.getLivros('lerei');
  }

  getImageById(id){
    return 'https://picsum.photos/id/'+id+'/200/300';
  }
/*
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
            this.livrosLendo.splice(this.livrosLendo.indexOf(livro), 1);
          }
        }, {
          text: 'Salvar',
          handler: data => {
            console.log(data);
            console.log(this.livrosLendo);
            this.livrosLendo.forEach(l => {
              if(l.id===livro.id){
                if(Number(data.paginaAtualInput) > livro.totalPaginas)
                  {l.paginaAtual = l.totalPaginas;}
                else
                  {l.paginaAtual = Number(data.paginaAtualInput);}
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
*/
  adicionarLivro(){
    console.log('Adicionando Livro');
    alert('Adicionando Livro');
  }
}
