import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  livrosLendo = [];
  /*
  {
    nome: string,
    totalPaginas: number,
    paginaAtual: number,
    id: number,
  }
  www.servidordeimagensdogeorge.com.br/id
  */

  constructor( public alertController: AlertController ) {
    this.livrosLendo.push(
      {
        nome: 'Bíblia',
        totalPaginas: 1400,
        paginaAtual: 30,
        id: 8,
      }
    );
    this.livrosLendo.push(
      {
        nome: 'O Pequeno Príncipe',
        totalPaginas: 198,
        paginaAtual: 160,
        id: 130,
      }
    );
    this.livrosLendo.push(
      {
        nome: 'Pedagogia do Oprimido',
        totalPaginas: 300,
        paginaAtual: 120,
        id: 21,
      }
    );


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

  adicionarLivro(){
    console.log('Adicionando Livro');
    alert('Adicionando Livro');
  }
}
