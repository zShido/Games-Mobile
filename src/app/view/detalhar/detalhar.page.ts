import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Jogo, { Genero } from 'src/app/model/Entities/Jogo';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  jogo!: Jogo;
  nome!: string;
  descricao!: string;
  genero!: Genero;
  avaliacao!: number;
  preco!: number;
  edicao: boolean = true;

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.jogo = history.state.jogo;
    this.nome = this.jogo.nome;
    this.descricao = this.jogo.descricao;
    this.genero = this.jogo.genero;
    this.avaliacao = this.jogo.avaliacao;
    this.preco = this.jogo.preco;
  }

  habilitarEdicao() {
    if (this.edicao) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  editar() {
    if (
      !this.nome ||
      !this.descricao ||
      !this.avaliacao ||
      !this.preco ||
      !this.genero
    ) {
      this.presentAlert('Erro', 'Todos os campos são obrigatórios!');
    } else {
      this.presentAlert('Sucesso', 'Jogo Cadastrado!');
      let novo: Jogo = new Jogo(this.nome, this.descricao);
      novo.genero = this.genero;
      novo.avaliacao = this.avaliacao;
      novo.preco = this.preco;
      this.firebase.update(novo, this.jogo.id);
      this.router.navigate(['/home']);
    }
  }

  excluir() {
    this.firebase.delete(this.jogo.id);
    this.router.navigate(['/home']);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Game List',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
