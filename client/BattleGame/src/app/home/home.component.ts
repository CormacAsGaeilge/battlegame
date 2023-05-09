import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Player } from '../models/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newPlayer?: Player;

  playerForm = new FormGroup({
    name: new FormControl('', [
      Validators.maxLength(20)
    ]),
  });

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {}

  submit(){
    if(!this.playerForm.value.name) return;

    this.playerService.createPlayer(this.playerForm.value.name).subscribe(
      (data) => {
        this.newPlayer = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
