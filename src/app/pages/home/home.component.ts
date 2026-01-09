import { Component, OnInit } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    games: Game[] = [];
    loading: boolean = true;

    constructor(private rawgService: RawgService) {}

    ngOnInit(): void {
        this.rawgService.getTrendingGames().subscribe({
        next: (res: any) => {
            this.games = res.results.slice(0, 50);
            this.loading = false;
        },
        error: (err) => {
            console.error(err);
            this.loading = false;
        }
        });
    }
}
