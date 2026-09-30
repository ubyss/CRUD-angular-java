import { Routes } from '@angular/router';
import { Template } from './template/template';
import { MeusCartoes } from './meus-cartoes/meus-cartoes';
import { CadastroCartoes } from './cadastro-cartoes/cadastro-cartoes';

export const routes: Routes = [
  { path: '', component: Template, pathMatch: 'full', data: { pagina: 'home' } },
  { path: '/meus-cartoes', component: MeusCartoes, data: { pagina: 'cartoes' } },
  { path: '/cadastro-cartoes', component: CadastroCartoes, data: { pagina: 'cadastro' } },
];
