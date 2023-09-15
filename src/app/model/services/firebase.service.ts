import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Jogo from '../Entities/Jogo';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PATH: string = 'jogos';

  constructor(private firestore: AngularFirestore) {}

  read() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  create(jogo: Jogo) {
    return this.firestore.collection(this.PATH).add({
      nome: jogo.nome,
      descricao: jogo.descricao,
      genero: jogo.genero,
      avaliacao: jogo.avaliacao,
      preco: jogo.preco,
    });
  }

  update(jogo: Jogo, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: jogo.nome,
      descricao: jogo.descricao,
      genero: jogo.genero,
      avaliacao: jogo.avaliacao,
      preco: jogo.preco,
    });
  }

  delete(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete;
  }
}
