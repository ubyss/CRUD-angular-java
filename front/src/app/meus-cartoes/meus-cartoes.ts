import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Template } from '../template/template';

@Component({
  selector: 'app-meus-cartoes',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './meus-cartoes.html',
  styleUrl: './meus-cartoes.scss',
})
export class MeusCartoes extends Template {}
