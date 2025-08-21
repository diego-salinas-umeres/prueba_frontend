import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { UserRegisterRequest } from '../../../../core/models/user.model';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {

  authForm!: FormGroup;
  isLogin: boolean = true;
  showPassword: boolean = false;
  isLoading: boolean = false;

  formData = {
    email: '',
    password: '',
    name: '',
    role: 'empleado'
  };

  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: [null],
      email: [null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: [null, Validators.required]
    })
  }

  onSubmit() {

    this.isLoading = true;

    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    if (this.isLogin) {
      const { email, password } = this.authForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          console.log('Login exitoso', res);
          this.router.navigate(['/inventory'])
        },
        error: (err) => {
          console.error('Error en login', err);
          this.isLoading = false;
        },
      });
    } else {
      const { username, email, password } = this.authForm.value;
      const user: UserRegisterRequest = {
        username,
        email,
        password,
        role: 'EMPLOYEE'
      };

      this.authService.register(user).subscribe({
        next: (res) => {
          console.log('Usuario registrado', res);
          this.isLoading = false
        },
        error: (err) => {
          console.error('Error en registro', err);
          this.isLoading = false
        },
      });
    }

  }

  toggleAuthMode(isLoginMode?: boolean) {
    this.isLogin = isLoginMode !== undefined ? isLoginMode : !this.isLogin;

    if (!this.isLogin) {
      this.authForm.get('username')?.setValidators([Validators.required]);
      this.authForm.get('password')?.setValidators([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/)
      ]);
      console.log('setting validators...')
    } else {
      this.authForm.get('username')?.clearValidators();
      this.authForm.get('username')?.setValue(null);
      this.authForm.get('password')?.setValidators([Validators.required]);
    }

    this.authForm.get('username')?.updateValueAndValidity();
    this.authForm.get('password')?.updateValueAndValidity();

  }



}
