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
  lista_jogos: Jogo[] = [];
  jogos: Jogo[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;
  query: string = '';
  @ViewChild('mySearchbar', { static: false })
  searchbar!: IonSearchbar;
  public user: any;
  emptySearchModel: any = {
    icon: 'search-outline',
    title: 'Nenhum jogo encontrado.',
  };
  model: any = {
    icon: 'game-controller-outline',
    title: 'nenhum jogo cadastrado',
  };

  constructor(
    private authService: AuthService,
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.user = this.authService.getUserLogged();
    console.log(this.user);
    this.isLoading = true;
    setTimeout(() => {
      this.firebase.read(this.user.uid).subscribe((res) => {
        this.lista_jogos = res.map((jogos) => {
          return {
            id: jogos.payload.doc.id,
            ...(jogos.payload.doc.data() as any),
          } as Jogo;
        });
      });
      this.isLoading = false;
    }, 2000);
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastro']);
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
    this.hasSearched = true;
    this.query = event.detail.value.toLowerCase();
    this.jogos = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(() => {
        // Filtrar a lista original de jogos com base no termo de pesquisa
        this.jogos = this.lista_jogos.filter((jogo: any) => {
          return jogo.nome.toLowerCase().includes(this.query);
        });
        console.log(this.jogos);
        this.isLoading = false;
      }, 2000);
    } else {
      // Se a pesquisa estiver vazia, redefinir a lista de jogos para a lista original
      this.jogos = [...this.lista_jogos];
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }

  returnSearch() {
    this.hasSearched = false;
    this.jogos = [...this.lista_jogos];
    this.searchbar.value = null;
  }
}
