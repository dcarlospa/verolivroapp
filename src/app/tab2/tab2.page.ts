import { Component } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  alunos = ['George', 'Laércio', 'Lucas', 'David'];
  constructor(
    public popoverController: PopoverController,
    public loadingController: LoadingController
    ) {

  }

  acao(nomeBotao){
    console.log(nomeBotao);
  }

  removeAluno(aluno){
    this.alunos.splice(this.alunos.indexOf(aluno), 1);
  }

  addAluno(){
    this.alunos.push('George '+this.alunos.length);

  }

  async carregar() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      duration: 5000
    });
    loading.present();
    //Conectar na API e salvar os dados, esperando a resposta da api
    loading.dismiss();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

  }

}
