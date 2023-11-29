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
  public nome!: string;
  public plataforma!: string;
  public genero!: Genero;
  public avaliacao!: number;
  public preco!: number;
  public imagem: any;
  lista_jogos: Jogo[] = [];

  constructor(
    private firebase: FirebaseService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  cadastrar() {
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
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
      } else {
        this.firebase.create(novo);
      }
      this.presentAlert('Sucesso', 'Jogo Cadastrado com Sucesso!');
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
