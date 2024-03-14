import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Jogo from 'src/app/model/Entities/Jogo';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public formCadastro: FormGroup;
  public imagem: any;
  public user: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.user = this.authService.getUserLogged();

    this.formCadastro = new FormGroup({
      nome: new FormControl(''),
      plataforma: new FormControl(''),
      genero: new FormControl(''),
      avaliacao: new FormControl(''),
      preco: new FormControl(''),
    });
  }

  ngOnInit() {
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      plataforma: ['', Validators.required],
      genero: ['', Validators.required],
      avaliacao: [
        '',
        [Validators.required, Validators.pattern(/^(10|\d(\.\d{1})?)$/)],
      ],
      preco: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{0,2})?$/),
          Validators.min(0),
        ],
      ],
    });
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  cadastrar() {
    if (this.formCadastro.valid) {
      this.alertService.simpleLoader();
      let novo: Jogo = new Jogo(
        this.formCadastro.value.nome,
        this.formCadastro.value.plataforma,
        this.formCadastro.value.genero,
        this.formCadastro.value.avaliacao,
        this.formCadastro.value.preco
      );
      novo.uid = this.user.uid;

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
        this.alertService.presentAlert('Sucesso', 'Jogo salvo!');
        this.router.navigate(['/home']);
      } else {
        this.firebase
          .create(novo)
          .then(() => {
            this.alertService.dismissLoader(); // Descarta o loader após a conclusão do salvamento
            this.alertService.presentAlert('Sucesso', 'Jogo salvo!');
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            this.alertService.dismissLoader(); // Descarta o loader em caso de erro
            console.error('Erro ao salvar o jogo', error);
          });
      }
    } else {
      this.alertService.presentAlert(
        'Erro',
        'Preencha todos os campos obrigatórios corretamente!'
      );
    }
  }
}
