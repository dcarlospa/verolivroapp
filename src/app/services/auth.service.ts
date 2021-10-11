import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId = '';
  public user: any;

  public musicas = ['Axé'
  , 'Blues'
  , 'Brega , Bregas Marcantes'
  , 'Country'
  , 'Eletrônica'
  , 'Forró'
  , 'Funk'
  , 'Gospel'
  , 'Hip Hop'
  , 'Jazz'
  , 'Melody , Tecnomelody'
  , 'Metal , Heavy Metal'
  , 'MPB'
  , 'Música clássica'
  , 'Pagode'
  , 'Pop'
  , 'Rap'
  , 'Reggae'
  , 'Rock'
  , 'Samba'
  , 'Sertanejo'
];

public cinemas = [
  'Ação'
  , 'Aventura'
  , 'Cinema de arte'
  , 'Chanchada'
  , 'Cinema catástrofe'
  , 'Comédia'
  , 'Comédia romântica'
  , 'Comédia dramática'
  , 'Comédia de ação'
  , 'Dança'
  , 'Documentário'
  , 'Docuficção'
  , 'Drama'
  , 'Espionagem'
  , 'Faroeste (ou western)'
  , 'Fantasia científica'
  , 'Ficção científica'
  , 'Filmes de guerra'
  , 'Musical'
  , 'Filme policial'
  , 'Romance'
  , 'Suspense'
  , 'Terror'
];

public literarios = [
  'Adolescente e Jovem Adulto'
  , 'Artes e fotografia'
  , 'Artesanato, Hobbies & Casa'
  , 'Auto-ajuda'
  , 'Biografias e Memórias'
  , 'Calendários'
  , 'Ciência matemática'
  , 'Computadores e Tecnologia'
  , 'Criação de Filhos & Relacionamentos'
  , 'Educação e Ensino'
  , 'Educação Financeira , Finanças'
  , 'Empreendedorismo'
  , 'Engenharia e Transportes'
  , 'Esportes e Ar Livre'
  , 'Ficção científica e fantasia'
  , 'História'
  , 'Humor e Entretenimento'
  , 'Lei'
  , 'Literatura e ficção'
  , 'Livros de culinária, comida e vinho'
  , 'Livros e Bíblias Cristãs'
  , 'Livros infantis'
  , 'Livros Lésbicas, Gays, Bissexuais e Transgêneros'
  , 'Livros médicos'
  , 'Mistério, suspense e suspense'
  , 'Negócios e Dinheiro'
  , 'Política e Ciências Sociais'
  , 'Preparação para teste'
  , 'Quadrinhos e romances gráficos'
  , 'Referência'
  , 'Religião e Espiritualidade'
  , 'Romance'
  , 'Saúde, Fitness e Dieta'
  , 'Viagem'
];

public escolaridades = [
  'Ensino Médio'
  , 'Ensino Superior Incompleto'
  , 'Ensino Superior Completo'
  , 'Especialização Completa'
  , 'Mestrado Completo'
  , 'Doutorado Completo'
];

public generos = [
'Masculino'
, 'Feminino'
, 'Outrxs'
];

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

   }

  cadastrar(){

  }

  carregaDadosDoUsuario(){
    this.firestore.doc('usuarios/'+this.userId).valueChanges({idField: 'docId'}).subscribe(user => {
      this.user = user;
    });
  }

  async cadastro(user){
    const result = await this.fireAuth.createUserWithEmailAndPassword(user.email, user.senha);
    if(result.user){
      this.firestore.doc('usuarios/'+result.user.uid).set({
        nome: user.nome,
        email: user.email,
        escolaridade: user.escolaridade,
        genero: user.genero,
        idade: user.idade,
        s: user.s,
        m:user.m,
        b:user.b
      });
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
      this.carregaDadosDoUsuario();
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
