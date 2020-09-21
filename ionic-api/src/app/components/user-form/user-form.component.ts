import { Component, OnInit } from '@angular/core';

// Importa biblioteca de formulários
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Importa o service da API
import { UsersService } from '../../services/users.service';

// Importa bibliotecas de roteamento
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  // Criar formulário
  public userForm: FormGroup;

  // Obtém o Id do usuário a ser editado, da rota
  id = this.route.snapshot.paramMap.get('id');

  // Detecta que usuário não existe
  noUser = false;

  constructor(

    // Cria objeto FormBuilder
    private formBuilder: FormBuilder,

    // Inicializa UsersService
    private usersService: UsersService,

    // Roteamento
    private NavCtrl: NavController,
    private route: ActivatedRoute
  ) {

    // Definindo os campos do formulário
    this.userForm = this.formBuilder.group(
      {
        // Campo 'Id'
        id: [null],

        // Campo 'name' - Obrigatório e deve ter no mínimo 3 caracteres
        name: [                     // Variável que armazena o valor do campo
          null,                     // Valor inicial do campo
          Validators.compose([      // Regras de validação do campo
            Validators.required,    // Campo obrigatório
            Validators.minLength(3) // comprimento mínimo
          ])
        ],

        // Campo 'email' - Obrigatório e deve ter o formato 'a@b'
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.email,
            // Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/) // Expressão regular ou Regex
          ])
        ],

        // Campo 'avatar' - Obrigatório e tem que ser um URL
        avatar: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
          ])
        ],

        // Campo 'status' - 0 ou 1
        status: [1],

        // Campo 'passwd' - Orbigatório entre 7 e 25 caracteres com letras, númeoros e alguns símbolos
        passwd: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^([a-zA-Z0-9!@#$%&*_\-+=]{7,25})$/)
          ])
        ]
      }
    );
  }

  ngOnInit() {

    // Se temos o id na rota é porque estamos editando
    if (this.id) {

      // Obter os dados da API para este usuário
      this.usersService.getUser(this.id).subscribe((res: any) => {

        // Se usuário não existe
        if (res.result === 'No record found') {

          // Avisa ao HTML
          this.noUser = true;

          // Sai sem fazer nada
          return false;
        } else {

          // Preenche o formulário com os dados deste usuário
          this.userForm.controls.id.setValue(res.result.id);
          this.userForm.controls.name.setValue(res.result.name);
          this.userForm.controls.email.setValue(res.result.email);
          this.userForm.controls.avatar.setValue(res.result.avatar);
          this.userForm.controls.passwd.setValue(res.result.passwd);

          // Converte status para number
          this.userForm.controls.status.setValue(parseInt(res.result.status, 10));
        }
      });
    }
  }

  // Método de envio do formulário
  onSubmit() {

    // Se o campo 'Id' está vazio, estamos cadastrando novo usuário
    if (this.userForm.value.id === null) {

      // Retificar a condição do botão de status
      this.statusChange();

      // Se o formulário está com erros, sai sem fazer nada
      if (this.userForm.invalid) {
        return false;
      }

      // Apagar o campo Id
      delete this.userForm.value.id;

      // Força envio de 'date'
      // this.userForm.value.date = new Date();

      // Salvar os dados do form na API
      this.usersService.postUser(this.userForm.value).subscribe((res: any) => {

        // Se conseguiu
        if (res.status === 'success') {

          // Feedback
          if (confirm(
            `"${this.userForm.value.name}" foi adicionado com sucesso!\n
          • Clique em [Ok] para listar os usuários;
          • Clique em [Cancelar] para cadastrar outro usuário.
                `)) {

            // Limpar o form
            this.userForm.reset();
            this.userForm.controls.status.setValue(1);

            // Retornar para a listagem
            this.NavCtrl.navigateForward('/usuarios/todos');
          } else {

            // Limpar o form
            this.userForm.reset();
            this.userForm.controls.status.setValue(1);
          }

        } else {

          // Exibe erro no console
          console.error('Falha:', res.result);
        }
      });

      // Se tenho um 'Id', estou editando um usuário existente
    } else {

      // Atualizando usuário
      this.usersService.updateUser(this.userForm.value).subscribe((res: any) => {

        // Se atualizou
        if (res.status === 'success') {

          // Feedback
          alert(`"${this.userForm.value.name}" atualizado com sucesso!!\n\nClique em [Ok] para continuar...`);

          // Retorna para os dados do usuário
          this.NavCtrl.navigateForward(`usuario/${this.userForm.value.id}${this.genString(8)}`);
        }
      });
    }
  }

  // Controlar o ion-toggle 'status' (Solução do 'bug do toggle')
  statusChange() {
    if (this.userForm.value.status === true) {
      this.userForm.value.status = 1;
    }
    if (this.userForm.value.status === false) {
      this.userForm.value.status = 0;
    }
    if (this.userForm.value.status === null) {
      this.userForm.value.status = 0;
    }
  }

  // Gerador de caracteres aleatórios
  genString(len: number) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
    let rnd = '';
    for (let i = 0; i < len; i++) {
      const rnum = Math.floor(Math.random() * letters.length);
      rnd += letters.substring(rnum, rnum + 1);
    }
    return rnd;
  }
}