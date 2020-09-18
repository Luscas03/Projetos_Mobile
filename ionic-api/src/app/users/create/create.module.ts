import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatePageRoutingModule } from './create-routing.module';
import { CreatePage } from './create.page';

// Importar o formulário do usuário
import { UserFormComponent } from '../../components/user-form/user-form.component';

// Importar o ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,

    // Importa ReactiveFormsModule
    ReactiveFormsModule
  ],
  declarations: [
    CreatePage,

    // Declara componente do formulário
    UserFormComponent
  ]
})
export class CreatePageModule {}