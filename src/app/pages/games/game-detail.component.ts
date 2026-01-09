import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawgService } from 'src/app/services/rawg.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserGamesService } from 'src/app/services/user-games.service';
import { Game } from 'src/app/models/game.model';
import { Comment } from 'src/app/models/comment.model';
import { UserGame } from 'src/app/models/user-game.model';

@Component({
    selector: 'app-game-detail',
    templateUrl: './game-detail.component.html',
    styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
    game!: Game;
    screenshots: any[] = [];
    comments: Comment[] = [];
    library: UserGame[] = [];
    newComment: string = '';

    constructor(
        private route: ActivatedRoute,
        private rawgService: RawgService,
        private commentsService: CommentsService,
        private userGamesService: UserGamesService
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.loadGame(id);
        this.loadScreenshots(id);
        this.loadComments(id);
        this.loadLibrary();
    }

    loadGame(id: number) {
        this.rawgService.getGameById(id).subscribe(game => this.game = game);
    }

    loadScreenshots(id: number) {
        this.rawgService.getScreenshots(id).subscribe(res => {
            this.screenshots = res.results;
        });
    }

    loadComments(id: number) {
        this.commentsService.getByGame(id).subscribe(c => this.comments = c);
    }

    loadLibrary() {
        this.userGamesService.getAll().subscribe(games => {
            this.library = games;
        });
    }

    addToLibrary() {
        this.userGamesService.add({
            gameId: this.game.id,
            name: this.game.name,
            background_image: this.game.background_image,
            status: 'wishlist',
            username: localStorage.getItem('username')!
        }).subscribe(() => alert('Juego añadido a tu biblioteca'));
    }

    addComment() {
        if (!this.newComment.trim())
            return ;

        const author = localStorage.getItem('username') || localStorage.getItem('email') || 'User';

        this.commentsService.add({
            gameId: this.game.id,
            author,
            text: this.newComment,
            date: new Date().toISOString(),
        }).subscribe(c => {
            this.comments.push(c);
            this.newComment = '';
        });
    }
}