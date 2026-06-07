import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Simulacion de llamada a una api ajkdasjhkadjdasklasd
      setTimeout(() => {
        const { username, password } = this.loginForm.value;
        if (username === 'admin' && password === 'admin123') {
          // Success
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenciales incorrectas. Por favor, intente de nuevo.';
        }
        this.isSubmitting = false;
      }, 500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
