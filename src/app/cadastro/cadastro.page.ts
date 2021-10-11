import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

 escolaridades: Array<string>;
 generos: Array<string>;
 musicas: Array<string>;
 cinemas: Array<string>;
 literarios: Array<string>;

  user = {
  email: '',
  senha: '',
  nome: '',
  idade: 0,
  escolaridade: 0,
  genero: 0,
  s:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  m:[false,false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,false,false],
  b:[false,false,false,false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false,false,false,false,false],
};

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
    ) {
      console.log(this.user);
      this.carregaDadosModelo();
    }

    carregaDadosModelo(){
      this.escolaridades = this.authService.escolaridades;
      this.generos = this.authService.generos;
      this.musicas = this.authService.musicas;
      this.cinemas = this.authService.cinemas;
      this.literarios = this.authService.literarios;

    }

  async cadastrar(){
    console.log('Efetuando o Cadastro...', this.user);
    const result = await this.authService.cadastro(this.user);
    if(result) {
      this.navCtrl.navigateRoot('tabs/tab1');
    }
  }

  voltar() {
    this.navCtrl.navigateRoot('login');
  }

  ngOnInit(){

  }
}
