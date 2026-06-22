import { Component } from '@angular/core';
import { DadosPerfilComponentComponent } from '../dados-perfil-component/dados-perfil-component.component';
import { TemaComponentComponent } from '../tema-component/tema-component.component';

@Component({
  selector: 'app-informacoes-perfil-component',
  imports: [DadosPerfilComponentComponent,TemaComponentComponent],
  templateUrl: './informacoes-perfil-component.component.html',
  styleUrl: './informacoes-perfil-component.component.css',
})
export class InformacoesPerfilComponentComponent {}
