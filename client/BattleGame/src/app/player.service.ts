import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './models/player';
import { Observable } from 'rxjs';
import { config } from 'config';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = config.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Api-Key': config.apiKey
  });
  constructor(private http: HttpClient) {}

  getPlayer(uuid: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/player/${uuid}`, { headers: this.headers});
  }

  createPlayer(name: string): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/player`, {name: name}, { headers: this.headers});
  }
  
  submitBattle(uuid: string, opponentUUID: string): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/player/${uuid}/battle`, {opponentUUID}, { headers: this.headers});
  }

  getLeaderBoard(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players`, { headers: this.headers});
  }
}
