import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/alert.service';
import Jogo from 'src/app/model/Entities/Jogo';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  jogo!: Jogo;
  edicao: boolean = true;
  public imagem!: any;
  public user: any;
  public formDetalhes!: FormGroup;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.getUserLogged();
  }

  ngOnInit() {
    this.jogo = history.state.jogo;
    this.formDetalhes = this.formBuilder.group({
      nome: [this.jogo.nome, Validators.required],
      plataforma: [this.jogo.plataforma, Validators.required],
      genero: [this.jogo.genero, Validators.required],
      avaliacao: [
        this.jogo.avaliacao,
        [Validators.required, Validators.pattern(/^(10|\d(\.\d{1})?)$/)],
      ],
      preco: [
        this.jogo.preco,
        [
          Validators.required,
          Validators.pattern(/^\d+\.\d{2}$/),
          Validators.min(0),
        ],
      ],
    });
  }

  habilitarEdicao() {
    this.edicao = !this.edicao;
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    if (this.formDetalhes.valid) {
      const novo: Jogo = new Jogo(
        this.formDetalhes.value.nome,
        this.formDetalhes.value.plataforma,
        this.formDetalhes.value.genero,
        this.formDetalhes.value.avaliacao,
        this.formDetalhes.value.preco
      );

      novo.id = this.jogo.id;
      novo.uid = this.user.uid;

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
      } else {
        this.firebase.update(novo, this.jogo.id);
      }

      this.alertService.presentAlert('Sucesso', 'Jogo alterado com sucesso!');
      this.router.navigate(['/home']);
    } else {
      this.alertService.presentAlert(
        'Erro',
        'Preencha todos os campos obrigatórios corretamente!'
      );
    }
  }

  excluir() {
    this.firebase.delete(this.jogo);
    this.router.navigate(['/home']);
  }
}
