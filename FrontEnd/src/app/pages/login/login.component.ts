import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonService } from '../../services/person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = ''
  password = ''
  constructor(private router: Router, private _personService: PersonService) {

  }
  login() {
    if (this.validateData()) {
      this._personService.login({ userName: this.username, password: this.password }).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          this.router.navigate(['/menu'])
        }, error: (e: HttpErrorResponse) => {
          Swal.fire({
            title: "Login Error",
            html: `<p id="loginError">${e.error.err}</p>`,
            icon: "error",
            showConfirmButton: false,
            timer: 1200
          })
        }
      })

    }
  }

  validateData(): boolean {

    const usernameRegex = /^[A-Z][a-z]{6}[0-9]$/;
    const passwordRegex = /^.{8,}$/;

    if (!usernameRegex.test(this.username)) {
      Swal.fire({
        title: "Invalid Username",
        html:'<p id="usernameError">Username must have the first capital letter, 6 lowercase letters and a number.</p>',
        icon: "info",
        showConfirmButton: false,
        timer: 1200
      })
      return false
    }
    if (!passwordRegex.test(this.password)) {
      Swal.fire({
        title: "Invalid Password",
        html:'<p id="passwordError">The password must have a minimum of 8 characters</p>',
        icon: "info",
        showConfirmButton: false,
        timer: 1200
      })
      return false
    }
    return true
  }
}
