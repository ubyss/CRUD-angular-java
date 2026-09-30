import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Template } from '../template/template';

@Component({
  selector: 'app-cadastro-cartoes',
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './cadastro-cartoes.html',
  styleUrl: './cadastro-cartoes.scss',
})
export class CadastroCartoes extends Template {}
