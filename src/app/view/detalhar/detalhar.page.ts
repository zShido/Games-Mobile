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
  plataforma!: string;
  genero!: Genero;
  avaliacao!: number;
  preco!: number;
  public imagem!: any;
  edicao: boolean = true;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.jogo = history.state.jogo;
    this.nome = this.jogo.nome;
    this.plataforma = this.jogo.plataforma;
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

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    if (
      !this.nome ||
      !this.plataforma ||
      !this.avaliacao ||
      !this.preco ||
      !this.genero
    ) {
      this.presentAlert('Erro', 'Todos os campos são obrigatórios!');
    } else {
      let novo: Jogo = new Jogo(
        this.nome,
        this.plataforma,
        this.genero,
        this.avaliacao,
        this.preco
      );
      novo.id = this.jogo.id;
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
      } else {
        this.firebase.update(novo, this.jogo.id);
      }

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
