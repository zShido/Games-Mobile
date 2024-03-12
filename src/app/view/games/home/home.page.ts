import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Jogo, { Genero } from 'src/app/model/Entities/Jogo';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public lista_jogos: Jogo[] = [];
  public Genero = Genero;
  public user: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUserLogged(); //recupera o usuário logado
    console.log(this.user);
    this.isLoading = true;
    setTimeout(() => {
      this.firebaseService.read(this.user.uid).subscribe((res) => {
        this.lista_jogos = res.map((jogo) => {
          return {
            id: jogo.payload.doc.id,
            ...(jogo.payload.doc.data() as any),
          } as Jogo;
        });
      });
      this.isLoading = false;
    }, 2000);
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  editarJogo(jogo: Jogo) {
    this.editar(jogo);
  }

  editar(jogo: Jogo) {
    this.router.navigateByUrl('/detalhar', { state: { jogo: jogo } });
  }

  logout() {
    this.authService.signOut().then((res) => {
      this.router.navigate(['signin']);
    });
  }
}
