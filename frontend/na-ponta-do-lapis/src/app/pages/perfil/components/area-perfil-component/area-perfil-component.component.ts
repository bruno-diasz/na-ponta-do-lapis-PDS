import { Component } from '@angular/core';
import { PerfilResumoComponentComponent } from '../perfil-resumo-component/perfil-resumo-component.component';
import { InformacoesPerfilComponentComponent } from '../informacoes-perfil-component/informacoes-perfil-component.component';

@Component({
  selector: 'app-area-perfil-component',
  imports: [PerfilResumoComponentComponent,InformacoesPerfilComponentComponent],
  templateUrl: './area-perfil-component.component.html',
  styleUrl: './area-perfil-component.component.css',
})
export class AreaPerfilComponentComponent {}
