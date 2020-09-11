import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

//Importa service de acesso a api
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
// var que identifica se temos usuários para listar
  noUsers = false;

// Variável com os dados que vieram da API
data:Array<any> = [];
  constructor(

    //Inicializa o serviço de acesso a API
    private usersService : UsersService
  ) { }
//Acrescentar "voiod" para tornar o metodo assincrono 
  ngOnInit(): void {
//Obtendo os daodos da API usando o service
this.usersService.getUsers().subscribe(
(res:any) => {
  //Se falharem a recepção dos dados
  
   if (res.status !== 'success') {
    console.error(`Falha: ${res.result}`);
    return false;
  }


  res.result.forEach((value:any) => {
    if (value !== null) {
      this.data.push(value);
    }
  });
//Se não existem usuários )db vazio)
if (this.data.length === 0) {
  this.noUsers = true;
}
});


  }

}
