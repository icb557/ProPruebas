import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonService } from '../../services/person.service';
import { Person } from '../../interfaces/person';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router, private _personService: PersonService) {

  }
  option = 0
  nit = null

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

  person: Person = {
    nit: "",
    firstName: "",
    middleName: "",
    lastName1: "",
    lastName2: "",
    birthdate: "",
    phoneNumber: "",
    email: "",
    userName: ""
  }

  searchPerson() {
    if (String(this.nit).length !== 10) {
      Swal.fire({
        title: 'Invalid Nit',
        text: 'Nit must be of 10 digits',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }

    this._personService.getPerson(String(this.nit)).subscribe({
      next: (data) => {
        this.person = data
        this.option = 3
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: "Error Searching Person",
          text: e.error.err,
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  deletePerson() {
    Swal.fire({
      title: "Delete Person",
      text: 'are you sure you want to delete it?',
      showDenyButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        this._personService.deletePerson(String(this.nit)).subscribe({
          next: () => {
            Swal.fire("Person Deleted!", "", "success").then(() => {
              this.option = 0
            })
          },
          error: () => {
            Swal.fire("Error Deleting Person", "", "error");
          }
        })

      }
    });
  }

}
