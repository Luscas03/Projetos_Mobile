import { Injectable } from '@angular/core';

// Importar as bilbiotecas assíncronas do Angular
import { Observable } from 'rxjs';

// Importar as bilbiotecas HTTP
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // URL "base" da API
  private apiUrl = 'http://localhost:8888/api';

  constructor(
    private http: HttpClient
  ) { }

  // Método para obter todos os usuários da API
  getUsers(): Observable<any> {

    // Faz o GET na API
    return this.http.get(this.apiUrl);
  }

  // Método para listar um usuário específico pelo Id
  getUser(id: string): Observable<any> {

    // Consulta à API no formato "http://localhost:8888/api?id={id}"
    return this.http.get(`${this.apiUrl}?id=${id}`);
  }
  // Métodod para apagar um usuário específico
  deletUser(id: string) : Observable<any> {
    //Apaga os dados da api
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }

  //Cadastrar Uuário
  postUser(data: any): Observable<any> {
//salvando o usuário
    return this.http.post(this.apiUrl, data);
  }

}