import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonService } from '../../services/person.service';
import { Person } from '../../interfaces/person';
import { HttpErrorResponse } from '@angular/common/http';
import { birthdateValidator } from '../../utils/birthdate.validator';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router, private _personService: PersonService) {

  }

  maxDate = ''
  minDate = ''

  ngOnInit() {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    this.maxDate = today.toISOString().split('T')[0];
  }

  option = 0
  searchForm = new FormGroup({
    nit: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
  })

  namePattern = /^[a-zA-Z]{3,20}$/
  numberPattern = /^\d{10}$/
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


  personForm = new FormGroup({
    nit: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    middleName: new FormControl('', [Validators.pattern(this.namePattern)]),
    lastName1: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastName2: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    birthdate: new FormControl('', [Validators.required, birthdateValidator()]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
  })

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
    if (!this.searchForm.valid) {
      Swal.fire({
        title: 'Invalid Nit',
        html:'<p id="searchError">Nit must have 10 digits</p>',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }

    this._personService.getPerson(String(this.searchForm.value.nit!)).subscribe({
      next: (data) => {
        this.person = data
        this.option = 3
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: "Error Searching Person",
          html:`<p id="searchError">${e.error.err}</p>`,
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  deletePerson() {
    this._personService.deletePerson(String(this.searchForm.value.nit!)).subscribe({
      next: () => {
        Swal.fire({
          title: "Done!",
          html:'<p id="deleteSuccess">Person Deleted</p>',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        }).then(() => {
          this.goBack()
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire("Error Deleting Person", `<p id="deleteError">${e.error.err}</p>`, "error");
      }
    })
  }

  goBack() {
    this.option = 0
    this.searchForm.reset()
  }

  create() {
    if (!this.personForm.valid) {
      this.checkErrorForm()
      return
    }

    const person: Person = {
      nit: String(this.personForm.value.nit!),
      firstName: this.personForm.value.firstName!,
      middleName: this.personForm.value.middleName!,
      lastName1: this.personForm.value.lastName1!,
      lastName2: this.personForm.value.lastName2!,
      birthdate: this.personForm.value.birthdate!,
      phoneNumber: String(this.personForm.value.phoneNumber!),
      email: this.personForm.value.email!
    }
    this._personService.createPerson(person).subscribe({
      next: () => {
        Swal.fire({
          title: "Success",
          html:'<p id="createSuccess">User created successfully</p>',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        }).then(() => {
          this.option = 0
          this.personForm.reset()
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: "Error Creating User",
          html: `<p id="createError">${e.error.err}</p>`,
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  updateUser() {
    this.option = 4
    this.personForm.controls['nit'].disable();
    this.personForm.setValue({
      nit: this.person.nit,
      firstName: this.person.firstName,
      middleName: this.person.middleName!,
      lastName1: this.person.lastName1,
      lastName2: this.person.lastName2,
      birthdate: this.person.birthdate,
      phoneNumber: this.person.phoneNumber,
      email: this.person.email
    });
  }

  resetForm() {
    this.personForm.controls['nit'].enable();
    this.personForm.setValue({
      nit: '',
      firstName: '',
      middleName: '',
      lastName1: '',
      lastName2: '',
      birthdate: '',
      phoneNumber: '',
      email: ''
    });
  }

  saveUpdateUser() {
    if (!this.personForm.valid) {
      this.checkErrorForm()
      return
    }

    const updatedPerson: Person = {
      nit: String(this.person.nit),
      firstName: this.personForm.value.firstName!,
      middleName: this.personForm.value.middleName!,
      lastName1: this.personForm.value.lastName1!,
      lastName2: this.personForm.value.lastName2!,
      birthdate: this.personForm.value.birthdate!,
      phoneNumber: String(this.personForm.value.phoneNumber!),
      email: this.personForm.value.email!
    }

    this._personService.updatePerson(updatedPerson.nit, updatedPerson).subscribe({
      next: () => {
        Swal.fire({
          title: "Success",
          html:'<p id="updateSuccess">User Updated successfully</p>',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        }).then(() => {
          Object.assign(this.person, updatedPerson);
          this.option = 3
          this.resetForm()
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: "Error Updating User",
          html: `<p id="updateError">${e.error.err}</p>`,
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })

  }

  checkErrorForm() {
    const invalidfield: any[] = []
    Object.keys(this.personForm.controls).forEach(field => {
      const control = this.personForm.get(field)
      if (control && control.invalid) {
        invalidfield.push({ field, errors: control.errors })
      }
    });
    console.log(invalidfield)
    Swal.fire({
      title: 'Invalid Form',
      html:'<p id="formError">Some field is wrong or invalid</p>',
      icon: "error",
      showConfirmButton: false,
      timer: 1200
    })
  }

}
