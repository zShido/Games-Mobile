import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';
import { LoadingGameComponent } from './loading-game/loading-game.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GamesComponent, LoadingGameComponent, EmptyScreenComponent],
  imports: [CommonModule, IonicModule],
  exports: [GamesComponent, LoadingGameComponent, EmptyScreenComponent]
})
export class ComponentsModule {}
