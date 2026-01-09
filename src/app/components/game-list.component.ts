import { Component, OnInit } from '@angular/core';
import { RawgService } from '../services/rawg.service';
import { Game } from '../models/game.model';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
    games: any[] = [];
    genres: any[] = [];
    searchText: string = '';
    selectedGenre: string = '';

    constructor(private rawgService: RawgService) {}

    ngOnInit(): void {
        this.rawgService.getTrendingGames().subscribe(response => {
            this.games = response.results;
        });
        this.loadGames();
        this.loadGenres();
    }

    loadGames() {
        this.rawgService.getGames(this.searchText, this.selectedGenre).subscribe({
            next: (res) => {
                this.games = res.results;
            },
            error: (err) => console.error('RAWG error: ', err)
        });
    }

    loadGenres() {
        this.rawgService.getGenres().subscribe(res => this.genres = res.results);
    }

    onSearch() {
        this.loadGames();
    }
}