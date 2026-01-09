import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private apiUrl = 'https://695b95021d8041d5eeb76473.mockapi.io/comments';

    constructor(private http: HttpClient) {}

    getByGame(gameId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(
            `${this.apiUrl}?gameId=${gameId}`
        );
    }

    add(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(this.apiUrl, comment);
    }
}