import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl
    this.myApiUrl = 'api/person'
  }
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }

  getPerson(nit: string): Observable<Person> {
    return this.http.get<Person>(`${this.myAppUrl}${this.myApiUrl}/${nit}`)
  }

  deletePerson(nit: string): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}/${nit}`)
  }

  createPerson(person: Person): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, person)
  }

  updatePerson(nit: string, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.myAppUrl}${this.myApiUrl}/${nit}`, person)
  }

  getPersonXmlReport(): Observable<string> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/report/xml`, { responseType: 'text' })
  }
}
