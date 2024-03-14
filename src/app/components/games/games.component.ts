import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Jogo from 'src/app/model/Entities/Jogo';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  @Input() jogo!: Jogo;
  @Output() editarJogo = new EventEmitter<Jogo>();

  constructor() {}

  emitirEdicao(jogo: Jogo) {
    this.editarJogo.emit(jogo);
  }
}
