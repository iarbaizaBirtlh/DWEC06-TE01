import { Component, OnInit } from '@angular/core';
import { UserGamesService } from 'src/app/services/user-games.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    username: string = '';
    email: string = '';
    library: any[] = [];
    stats = {
        playing: 0,
        completed: 0,
        wishlist: 0
    };

    constructor(private userGamesService: UserGamesService) {}

    ngOnInit(): void {
        this.username = localStorage.getItem('username') || 'Usuario';
        this.email = localStorage.getItem('email') || 'email@mock.com';
        this.loadLibrary();
    }

    loadLibrary() {
        this.userGamesService.getAll().subscribe(lib => {
            this.library = lib;
            this.stats.playing = lib.filter(g => g.status === 'playing').length;
            this.stats.completed = lib.filter(g => g.status === 'completed').length;
            this.stats.wishlist = lib.filter(g => g.status === 'wishlist').length;
        });
    }
}