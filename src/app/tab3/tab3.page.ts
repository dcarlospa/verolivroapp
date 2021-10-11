import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { dataset } from '../../environments/dados';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sortIndices = [];
  indiceResultado = -1;
  respostas = [];

  user: any;

  constructor(firestore: AngularFirestore) {
  }

  proximo(){
    if(this.indiceResultado>=this.respostas.length){
      return;
    }
    this.indiceResultado++;
  }

  async getSugestao(){
    const person = this.user;
    console.log('getSugestao Ok');

    const resposta = this.iniciaRespostas(620);
    dataset.forEach((element, i) => {
        resposta[i] = this.distancia(person, element);
    });
    this.sortWithIndeces(resposta);
    const resp = Array(20);
    for( let i=0; i<resp.length; i++){
        resp[i] = dataset[this.sortIndices[i]];
    }
    this.respostas = resp;
    this.indiceResultado = 0;
  }

  sortWithIndeces(toSort) {
    for (let i = 0; i < toSort.length; i++) {
      toSort[i] = [toSort[i], i];
    }
    toSort.sort((left, right) => left[0] < right[0] ? -1 : 1);

    this.sortIndices = [];
    for (let j = 0; j < toSort.length; j++) {
      this.sortIndices.push(toSort[j][1]);
      toSort[j] = toSort[j][0];
    }
    return toSort;
  }

  iniciaRespostas(x){
    const a = [];
    for (let i = 0; i < x; i++) {
        a.push(Infinity);
    }
    return a;
  }

  distancia(pessoaA, pessoaB){
    let resultado = 0;
    resultado += this.distanciaIdade(pessoaA.idade, pessoaB.idade);
    resultado += this.distanciaGenero(pessoaA.genero, pessoaB.genero);
    resultado += this.distanciaEscolaridade(pessoaA.escolaridade, pessoaB.escolaridade);
    resultado += this.distanciaGosto(pessoaA.s, pessoaB.s, 1);//21
    resultado += this.distanciaGosto(pessoaA.m, pessoaB.m, 1);//23
    resultado += this.distanciaGosto(pessoaA.b, pessoaB.b, 2);//34
    return resultado;
  }
  //2
  //8
  //false true true true
  //true false false false
  distanciaGosto(a, b, peso){//a gosto da pessoa a, b gosto da pessoa b, e peso
    let resposta = 0;
    for(let i=0; i<a.length; i++){
      if(a[i]!==b[i]){
        resposta += peso;
      }
    }
    return resposta;
  }

  distanciaGenero(generoA, generoB){
    if(generoA===generoB)
        {return 0;}
    return 3;
  }

  distanciaEscolaridade(escolaridadeA, escolaridadeB){
    const dif = Math.abs(escolaridadeA - escolaridadeB);
    if ( dif===0){
        return 0;
    }
    if ( dif===1){
        return 0.5;
    }
    if ( dif===2){
        return 1;
    }
    if ( dif===3){
        return 2;
    }
    if ( dif===4){
        return 3;
    }
    else
        {return 5;}
  }

  distanciaIdade(pidade, eidade){
    const dif = Math.abs(pidade - eidade);
    if(dif===0){
        return 0;
    }
    if ( dif<3){//3 anos de diferença
        return 0.1;
    }
    else if(dif<5){
        return 0.5;
    }
    else if(dif<8){
        return 2;
    }
    else if(dif<11){
        return 3;
    }
    else if(dif<20){
        return 8;
    }
    else if(dif<35){
        return 10;
    }
    else
        {return 12;}
  }

}
