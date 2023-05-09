import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  leaderBoard: Player[] = [];
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getLeaderBoard().subscribe(
      (data) => {
        console.log(data);
        this.leaderBoard = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
