import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  user: any;

  escolaridades: any;
 generos: any;
 musicas: any;
 cinemas: any;
 literarios: any;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
    ) {
      this.user = this.authService.user;
      this.carregaDadosModelo();
    }

    carregaDadosModelo(){
      this.escolaridades = this.authService.escolaridades;
      this.generos = this.authService.generos;
      this.musicas = this.authService.musicas;
      this.cinemas = this.authService.cinemas;
      this.literarios = this.authService.literarios;

    }

  async sair(){
    console.log('Saindo...');
    const result = await this.authService.logout();
    this.navCtrl.navigateRoot('login');
  }
/**
 * Pegar os dados de perfil
 * Exibir Perfil
 * Editar Perfil (modal ou page)
 * Executar o KNN nos dados do perfil
 */

}
