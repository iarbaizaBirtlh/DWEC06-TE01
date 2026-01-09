import { Component, OnInit } from '@angular/core';
import { UserGamesService } from '../../services/user-games.service';
import { RawgService } from '../../services/rawg.service';

@Component({
    selector: 'app-my-library',
    templateUrl: './my-library.component.html',
    styleUrls: ['./my-library.component.css'],
})
export class MyLibraryComponent implements OnInit {
    library: any[] = [];
    loading = true;

    constructor(
        private userGamesService: UserGamesService,
        private rawgService: RawgService
    ) {}

    ngOnInit() {
        this.loadLibrary();
    }

    loadLibrary() {
        this.userGamesService.getAll().subscribe(userGames => {
            this.library = [];
            userGames.forEach(ug => {
                this.rawgService.getGameById(ug.gameId).subscribe(game => {
                    this.library.push({ ...ug, game });
                });
            });
            this.loading = false;
        });
    }
    
    updateStatus(item: any) {
        this.userGamesService.update(item).subscribe();
    }

    deleteGame(id: string) {
        if (!confirm('¿Estás seguro de que deseas eliminar este juego de tu biblioteca?'))
            return ;

        this.userGamesService.delete(id).subscribe(() => {
            this.library = this.library.filter(g => g.id !== id);
        });
    }
}