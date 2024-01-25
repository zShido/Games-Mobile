import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import Jogo, { Genero } from 'src/app/model/Entities/Jogo';
import { AuthService } from 'src/app/model/services/auth.service';
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
  public user: any;

  constructor(
    private firebase: FirebaseService,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.user = this.authService.getUserLogged();
  }

  ngOnInit() {}

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  cadastrar() {
    if (
      this.nome &&
      this.plataforma &&
      this.avaliacao &&
      this.preco &&
      this.genero
    ) {
      let novo: Jogo = new Jogo(
        this.nome,
        this.plataforma,
        this.genero,
        this.avaliacao,
        this.preco
      );
      novo.uid = this.user.uid; // adiciona o uid do usuário logado
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
      } else {
        this.firebase.create(novo);
      }
      this.alertService.presentAlert('Sucesso', 'Jogo cadastrado com sucesso!');
      this.router.navigate(['/home']);
    } else {
      this.alertService.presentAlert('Erro', 'Campos obrigatórios!');
    }
  }
}
