import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login-register.component.css"],
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = "";

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    submit() {
        if (this.loginForm.invalid)
            return ;

        const { email, password } = this.loginForm.value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
            (u: any) => u.email === email && u.password === password
        );

        if (!user) {
            this.errorMessage = 'Email o contraseña incorrectos';
            return ;
        }

        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('email', user.email);
        localStorage.setItem('username', user.username);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/profile']);
    }
}