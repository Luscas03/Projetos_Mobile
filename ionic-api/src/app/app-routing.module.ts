import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Rota da página inicial da aplicação
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  // Rota da página "inicio"
  {
    path: 'inicio',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },

  // Rota para a página "e404"
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },

  // Rota para a página "sobre"
  {
    path: 'sobre',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },

  // Rota para listar todos os usuários
  {
    path: 'usuarios/:nc',
    loadChildren: () => import('./users/list/list.module').then( m => m.ListPageModule)
  },

  // Rota para exibir usuário único
  {
    path: 'usuario/:id',
    loadChildren: () => import('./users/user/user.module').then( m => m.UserPageModule)
  },

  // Rota para rotas inexistentes - DEVE SER SEMPRE A ÚLTIMA ROTA
  {
    path: '**',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}