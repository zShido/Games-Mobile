import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-game',
  templateUrl: './loading-game.component.html',
  styleUrls: ['./loading-game.component.scss'],
})
export class LoadingGameComponent implements OnInit {
  dummy = Array(5);
  constructor() {}

  ngOnInit() {}
}
