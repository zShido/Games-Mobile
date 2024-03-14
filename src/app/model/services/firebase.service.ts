import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/common/alert.service';
import Jogo from '../Entities/Jogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PATH: string = 'jogos';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private alertService: AlertService
  ) {}

  read(uid: string) {
    return this.firestore
      .collection(this.PATH, (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  create(jogo: Jogo) {
    return this.firestore.collection(this.PATH).add({
      nome: jogo.nome,
      plataforma: jogo.plataforma,
      genero: jogo.genero,
      avaliacao: jogo.avaliacao,
      preco: jogo.preco,
      uid: jogo.uid,
    });
  }

  createWithAvatar(jogo: Jogo) {
    return this.firestore.collection(this.PATH).add({
      nome: jogo.nome,
      plataforma: jogo.plataforma,
      genero: jogo.genero,
      avaliacao: jogo.avaliacao,
      preco: jogo.preco,
      downloadURL: jogo.downloadURL,
      uid: jogo.uid,
    });
  }

  update(jogo: Jogo, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: jogo.nome,
      plataforma: jogo.plataforma,
      genero: jogo.genero,
      avaliacao: jogo.avaliacao,
      preco: jogo.preco,
      uid: jogo.uid,
    });
  }

  updateWithAvatar(jogo: Jogo, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: jogo.nome,
      plataforma: jogo.plataforma,
      genero: jogo.genero,
      avaliacao: jogo.avaliacao,
      preco: jogo.preco,
      downloadURL: jogo.downloadURL,
      uid: jogo.uid,
    });
  }

  delete(jogo: Jogo) {
    return this.firestore.collection(this.PATH).doc(jogo.id).delete();
  }

  uploadImage(imagem: any, jogo: Jogo) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] != 'image') {
      console.error('Tipo não suportado!');
      return;
    }

    const path = `images/${jogo.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let uploadFileURL = fileRef.getDownloadURL();
          uploadFileURL.subscribe((resp) => {
            jogo.downloadURL = resp;
            if (!jogo.id) {
              this.createWithAvatar(jogo);
            } else {
              this.updateWithAvatar(jogo, jogo.id);
            }
            this.alertService.dismissLoader();
          });
        })
      )
      .subscribe();
  }
}
