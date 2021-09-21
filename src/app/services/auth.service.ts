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

  getLivros(estado: string){ //estado=lido, lendo, lerei
    return this.firestore.collection('livros',
    ref => ref
      .where('dono','==', this.userId)
      .where('estado','==',estado)
      .orderBy('nome')
    ).valueChanges();
  }

  getResumos(tipo: string){ //estado=meus, tops, recentes
    if(tipo==='meus'){
      return this.firestore.collection('resumos',
      ref => ref
        .where('autor','==', this.userId)
        .orderBy('dataCriacao', 'desc')
      ).valueChanges();
    }
    else {

    }
  }
}
