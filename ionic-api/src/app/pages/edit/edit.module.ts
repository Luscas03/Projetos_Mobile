import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
//Importa o módulo de cadastro

import { CreatePageModule } from '../../users/create/create.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    CreatePageModule,
    ReactiveFormsModule,
  ],
  declarations: [EditPage]
})
export class EditPageModule {}
