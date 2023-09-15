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
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    
    path: 'home',
    loadChildren: () =>
      import('./view/home/home.module').then((m) => m.HomePageModule),
  },
  
  {
    path: 'cadastrar',
    loadChildren: () =>
      import('./view/cadastrar/cadastrar.module').then(
        (m) => m.CadastrarPageModule
      ),
  },
  {
    path: 'detalhar',
    loadChildren: () =>
      import('./view/detalhar/detalhar.module').then(
        (m) => m.DetalharPageModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
