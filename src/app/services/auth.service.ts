import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn.asObservable();

    constructor() {
        this._isLoggedIn.next(!!localStorage.getItem('token'));
    }

    setLoggedIn(value: boolean) {
        this._isLoggedIn.next(value);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        this._isLoggedIn.next(false);
    }

    isLoggedIn(): boolean {
        return this._isLoggedIn.value;
    }
}
