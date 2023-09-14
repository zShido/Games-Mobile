import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Jogo from 'src/app/model/Entities/Jogo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lista_jogos : Jogo[] = [];

  constructor(private router : Router,
    //private firebase: FirebaseService//
    ) {
      /*this.firebase.read()
      .subscribe(res => {
        this.lista_jogos = res.map(jogo =>{
          return {
            id: jogo.payload.doc.id,
            ...jogo.payload.doc.data() as any
          }as Jogo
        })
      });*/
    }

    irParaCadastrar(){
      this.router.navigate(["/cadastrar"]);
    }
  
    editar(jogo : Jogo){
      this.router.navigateByUrl("/detalhar", {
        state: {jogo: jogo}});
    }

}
