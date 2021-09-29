import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId = '';

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

   }

  cadastrar(){

  }

  async cadastro(nome, email, senha){
    const result = await this.fireAuth.createUserWithEmailAndPassword(email, senha);
    if(result.user){
      this.firestore.doc('usuarios/'+result.user.uid).set({nome, email});
      this.userId = result.user.uid;
      return true;
    }
    return false;
  }

  async login(email, senha){
    const result = await this.fireAuth.signInWithEmailAndPassword(email, senha);
    if(result.user) {
      console.log(result.user.uid);
      this.userId = result.user.uid;
      return true;
    }
    else {
      return false;
    }
  }

  async logout(){
    await this.fireAuth.signOut();
    this.userId='';
  }

}
