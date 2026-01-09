import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./login-register.component.css"],
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string = "";
    successMessage: string = "";

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    submit() {
        if (this.registerForm.invalid)
            return ;

        const { username, email, password } = this.registerForm.value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some((u: any) => u.email === email)) {
            this.errorMessage = 'Este email ya está registrado';
            return ;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/profile']);
    }
}