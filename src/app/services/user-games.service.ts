import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGame } from '../models/user-game.model';

@Injectable({
    providedIn: 'root'
})
export class UserGamesService {
    private apiUrl = 'https://695b95021d8041d5eeb76473.mockapi.io/library';

    constructor(private http: HttpClient) {}

    getAll(): Observable<UserGame[]> {
        return this.http.get<UserGame[]>(this.apiUrl);
    }

    add(game: UserGame): Observable<UserGame> {
        return this.http.post<UserGame>(this.apiUrl, game);
    }

    update(game: UserGame): Observable<UserGame> {
        return this.http.put<UserGame>(`${this.apiUrl}/${game.id}`, game);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}