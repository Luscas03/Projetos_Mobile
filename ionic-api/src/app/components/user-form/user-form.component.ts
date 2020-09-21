import { Component, OnInit } from '@angular/core';

//Importa a biblioteca de formulários
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Importa o service da API
import { UsersService } from '../../services/users.service';

//Importa bibliotecas de roteamento 
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  //Criar fomulário 
  public userForm: FormGroup;

  constructor(

    //cria o objeto FormBuilder
    private formBuilder: FormBuilder,

    //inicializa UsersService
    private usersService: UsersService,

    //Rotramento 
    private NavCtrl: NavController,
    private route: ActivatedRoute


  ) {

    //Definindo  os campos do formulário 
    this.userForm = this.formBuilder.group(
      {
        //Campo 'ID'
        id: [null],
        //Campo 'name' - Deve ter no míninmo 3 caracteres 
        name: [ // Variável que armazena o valor do campo
          null,  //Valor inicial do campo
          Validators.compose([ // regras de validação

            Validators.required,//campo obrigatorio
            Validators.minLength(3) // comprimento min
          ])
        ],
        //campo email - Obrigatório e deve ter p formato 'a@b'
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.email,
            // Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/) //Expressão regular ou regex
          ])
        ],
        //Campo 'avatar'
        avatar: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
          ])
        ],
        //CAMPO STATUS 0 ou 1
        status: [1],
        //Campo passwd 
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
  
  }

//método de envio de formulário 
onSubmit() {
//Retificar a condição do botão de status

this.statusChange();

//Se o form está com erros , sai sem fazer nada
if (this.userForm.invalid) {
  return false;
}
//apagr o campo id

delete this.userForm.value.id;

//salvar os dados do form na API
  this.usersService.postUser(this.userForm.value).subscribe((res : any) =>{

    //Se conseguiu
if(res.status === 'success') {
//Feedback
if (confirm(`"${this.userForm.value.name}" foi adicionado com sucesso!\n
• Clique em [OK] para listar os usuários;
• Clique em [Cancelar] para cadastrar o usuário.
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
}
//Controlar o ion-toggle 'status' (soluição do 'bug do toggle')
statusChange(){
 
  if (this.userForm.value.status === true ) {
    this.userForm.value.status = 1 ;
  }
  
  if (this.userForm.value.status === false ) {
    this.userForm.value.status = 0 ;
}
 
if (this.userForm.value.status === null ) {
  this.userForm.value.status = 0 ;
}
}
}
