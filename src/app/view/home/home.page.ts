import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Jogo, { Genero } from 'src/app/model/Entities/Jogo';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lista_jogos: Jogo[] = [];
  public Genero = Genero;
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.firebaseService.read().subscribe((res) => {
      this.lista_jogos = res.map((jogo) => {
        return {
          id: jogo.payload.doc.id,
          ...(jogo.payload.doc.data() as any),
        } as Jogo;
      });
    });
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  editar(jogo: Jogo) {
    this.router.navigateByUrl('/detalhar', { state: { jogo: jogo } });
  }
}
