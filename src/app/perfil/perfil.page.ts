import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
    ) {}

  async efetuarLogin(){
    console.log('Efetuando o Login...');
    const result = await this.authService.login(this.email, this.senha);
    if(result) {
      this.navCtrl.navigateRoot('tabs/tab1');
    }

  }

}
