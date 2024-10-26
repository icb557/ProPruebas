import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router) {

  }
  option = 0

  logOut() {
    localStorage.removeItem('token')
    Swal.fire({
      title: 'Good bye!!',
      icon: "success",
      showConfirmButton: false,
      timer: 1200
    }).then(() => {
      this.router.navigate([''])
    })
  }
}
