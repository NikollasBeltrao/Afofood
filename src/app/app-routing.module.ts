import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'perfil-restaurante',
    loadChildren: () => import('./perfil-restaurante/perfil-restaurante.module').then( m => m.PerfilRestaurantePageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'requests/:id',
    loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'do-request',
    loadChildren: () => import('./do-request/do-request.module').then( m => m.DoRequestPageModule)
  },
  {
    path: 'register-restaurante',
    loadChildren: () => import('./register-restaurante/register-restaurante.module').then( m => m.RegisterRestaurantePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
