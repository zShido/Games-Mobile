import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Jogo, { Genero } from 'src/app/model/Entities/Jogo';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { IonSearchbar } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private originalListaJogos: Jogo[] = [];
  public lista_jogos: Jogo[] = [];
  public Genero = Genero;
  public user: any;
  isLoading: boolean = false;
  hasSearched: boolean = false;
  query: string = '';
  @ViewChild('mySearchbar', { static: false })
  searchbar!: IonSearchbar;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUserLogged();
    console.log(this.user);
    this.carregarListaJogos();
  }

  carregarListaJogos() {
    this.isLoading = true;
    setTimeout(() => {
      this.firebaseService.read(this.user.uid).subscribe((res) => {
        this.originalListaJogos = res.map((jogo) => {
          return {
            id: jogo.payload.doc.id,
            ...(jogo.payload.doc.data() as any),
          } as Jogo;
        });
        this.lista_jogos = [...this.originalListaJogos]; // Copia da lista original
        this.isLoading = false;
      });
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

  async onSearchChange(event: any) {
    this.isLoading = true;
    this.query = event.detail.value.toLowerCase();
    if (this.query.length > 0) {
      setTimeout(() => {
        // Filtrar a lista original de jogos com base no termo de pesquisa
        const filteredJogos = this.originalListaJogos.filter((jogo) =>
          jogo.nome.toLowerCase().includes(this.query)
        );
        // Atualizar a lista de jogos com os resultados da pesquisa
        this.lista_jogos = filteredJogos;
        // Se a pesquisa retornar resultados, atualizar o estado hasSearched para true
        this.hasSearched = true;
        console.log(this.lista_jogos);
        this.isLoading = false;
      }, 2000);
    } else {
      // Se a pesquisa estiver vazia, redefinir o estado hasSearched para false
      // e recarregar a lista completa de jogos
      this.hasSearched = false;
      this.carregarListaJogos();
    }
  }
}
