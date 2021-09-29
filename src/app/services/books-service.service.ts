import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  userId=null;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.loadUserId();
  }

  loadUserId(){
    this.fireAuth.currentUser.then( user => {
      if(user){
        this.userId = user.uid;
      }
      console.log(user);
    });
  }

  getLivros(estado: string){ //estado=lido, lendo, lerei
    return this.firestore.collection('livros',
    ref => ref
      .where('dono','==', this.userId)
      .where('estado','==',estado)
      .orderBy('nome')
    ).valueChanges({ idField: 'docId' });
  }


  getResumos(tipo: string){ //estado=meus, tops, recentes
    if(tipo==='meus'){
      return this.firestore.collection('resumos',
      ref => ref
        .where('autor','==', this.userId)
        .orderBy('dataCriacao', 'desc')
      ).valueChanges({ idField: 'docId' });
    }
    else {

    }
  }

  updateLivro(livro){
    this.firestore.doc('livros/'+livro.docId).update(livro);
  }

  getNomeAutorById(id){
    return this.firestore.doc<any>('usuarios/'+id).valueChanges();
  }

  adicionarLivro(livro){
    this.firestore.collection('livros').add(livro);
  }
}
