import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  goToCadastro(){
    this.navCtrl.navigateRoot('cadastro');
  }

  ngOnInit() {
  }

}
