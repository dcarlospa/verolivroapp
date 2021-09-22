import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId = '';
  estaLogado = false;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

   }

  cadastrar(){

  }

  async login(email, senha){
    const result = await this.fireAuth.signInWithEmailAndPassword(email, senha);
    if(result.user) {
      console.log(result.user.uid);
      this.userId = result.user.uid;
      this.estaLogado = true;
      return true;
    }
    else {
      this.estaLogado = false;
      return false;
    }
  }

  logout(){

  }

}
