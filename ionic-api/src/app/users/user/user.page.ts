import { Component, OnInit } from '@angular/core';

// Importa o service de acesso à API
import { UsersService } from '../../services/users.service';

// Importa biblioteca de rotas dinâmicas
import { ActivatedRoute } from '@angular/router';

// Importa biblioteca de navegação
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  // Variável para armazenar o Id na forma de número
  id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

  // Variável que identifica se temos usuário
  noUser = false;

  // Variável com os dados do usuário obtido
  data: any;

  constructor(
    // Inicializa service da API
    private usersService: UsersService,

    // Inicializa ActivatedRoute
    private activatedRoute: ActivatedRoute,

    // Inicializa NavController
    private navController: NavController
  ) { }

  ngOnInit() {

    // Obtendo usuário da API
    this.usersService.getUser(this.id.toString()).subscribe((res: any) => {

      // Caso a API falhe em obter os dados
      if (res.status !== 'success') {

        // Exibe erro no console do anvegador
        console.error(`Erro: ${res.result}`);

        // Sai sem fazer nada
        return false;
      }

      // Se a API não retornou ninguém
      if (res.result === 'No record found') {

        // Informa para a view
        this.noUser = true;

        // Sai sem fazer nada
        return false;

        // Se usuário foi encontrado
      } else {

        // Obtém os dados e armazena em "data"
        this.data = res.result;
      }
    });
  }
  //Ação do botão de apagar
  delUser(id : string, name : string) {
if(!confirm (`Tem Certeza que deseja apagar "${name}"?\n    Esta ação é irreversível!\n Clique em [Ok] para apagar ou [Cancelar] para cancelar.`
)){
  // Sair sem fazer nada
  return false;
}
//Apagar o resgistro
this.usersService.deletUser(this.id.toString()).subscribe((res:any) => {
  //se apagou
  if (res.status === 'success' && res.result === 'Record deleted successfully') {
    alert ('Usuário apagado com sucesso!\n\nClique em [OK] para continuar.');
    //retorna oara a listagem
    this.navController.navigateForward('/usuarios/' + this.genString(7));
  }
});

  }

  //Gerador de caracteres aleatórios
  // Gerador de caracteres aleatórios
  genString(len: number) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let rnd = '';
    for (let i = 0; i < len; i++) {
      const rnum = Math.floor(Math.random() * letters.length);
      rnd += letters.substring(rnum, rnum + 1);
    }
    return rnd;
  }
}