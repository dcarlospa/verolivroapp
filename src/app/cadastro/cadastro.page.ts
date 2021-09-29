import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  email = '';
  senha = '';
  nome = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
    ) {}

  async efetuarLogin(){
    console.log('Efetuando o Cadastro...');
    const result = await this.authService.cadastro(this.nome, this.email, this.senha);
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
