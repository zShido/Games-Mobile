import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./view/games/welcome/welcome.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./view/games/home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'cadastrar',
    loadChildren: () =>
      import('./view/games/cadastrar/cadastrar.module').then(
        (m) => m.CadastrarPageModule
      ),
  },
  {
    path: 'detalhar',
    loadChildren: () =>
      import('./view/games/detalhar/detalhar.module').then(
        (m) => m.DetalharPageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./view/usuarios/signin/signin.module').then(
        (m) => m.SigninPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./view/usuarios/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
