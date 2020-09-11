import { Injectable } from '@angular/core';

//Importar as bibliotecas assincronas do Angular 
import { Observable } from 'rxjs';

//importar bibliotecas HTTP
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiurl = 'http://localhost:8888/api';
 
constructor(
    private http: HttpClient
  ) { }
//Método para obter todos os usuarios da API
getUsers(): Observable<any> {
  //faz o get da api
  return this.http.get(this.apiurl);
}

}
