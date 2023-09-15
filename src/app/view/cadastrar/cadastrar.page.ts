import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Jogo, { Genero } from 'src/app/model/Entities/Jogo';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome!: string;
  descricao!: string;
  genero!: Genero;
  avaliacao!: number;
  preco!: number;
  lista_jogos: Jogo[] = [];

  constructor(
    private firebase: FirebaseService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  cadastrar() {
    if (!this.nome || !this.descricao) {
      this.presentAlert('Erro', 'Todos os campos são obrigatórios!');
    } else {
      this.presentAlert('Sucesso', 'Jogo Cadastrado com Sucesso!');
      let novo: Jogo = new Jogo(this.nome, this.descricao);
      novo.genero = this.genero;
      novo.avaliacao = this.avaliacao;
      novo.preco = this.preco;
      this.firebase.create(novo);
      this.router.navigate(['/home']);
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Jogos',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
