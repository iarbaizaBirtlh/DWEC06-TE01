import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RawgService {
    private apiKey = '2679237d24b34f2aa8894b8949b8a92e';
    private baseUrl = 'https://api.rawg.io/api';

    constructor(private http: HttpClient) {}

    getTrendingGames(): Observable<any> {
        return this.http.get(
            `${this.baseUrl}/games?ordering=-added&page_size=50&key=${this.apiKey}`
        );
    }

    getGameById(id: number): Observable<any> {
        return this.http.get(
            `${this.baseUrl}/games/${id}?key=${this.apiKey}`
        );
    }

    getScreenshots(id: number): Observable<any> {
        return this.http.get(
            `${this.baseUrl}/games/${id}/screenshots?key=${this.apiKey}`
        );
    }

    getGames(search: string = '', genre: string = '') {
        let url = `${this.baseUrl}/games?key=${this.apiKey}&page_size=50`;

        if (search)
            url += `&search=${search}`;
        if (genre)
            url += `&genres=${genre}`;
        return this.http.get<any>(url);
    }

    getGenres() {
        return this.http.get<any>(`${this.baseUrl}/genres?key=${this.apiKey}`);
    }
}
