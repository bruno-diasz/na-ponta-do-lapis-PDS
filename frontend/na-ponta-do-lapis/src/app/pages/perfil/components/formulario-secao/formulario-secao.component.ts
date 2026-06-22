import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// Interface para tipar a configuração de cada campo do formulário
export interface CampoFormulario {
  key: string;          // Chave correspondente no FormControl e no DTO do Backend
  label: string;        // Texto que aparece acima do input (ex: "Nome")
  placeholder: string;  // Texto interno de ajuda (placeholder)
  type?: string;        // 'text', 'password', etc. (Padrão: 'text')
  isCelular?: boolean;  // Se verdadeiro, adiciona o bloco decorativo do DDI (+55)
}

@Component({
  selector: 'app-formulario-secao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-secao.component.html'
})
export class FormularioSecaoComponent {
  @Input() titulo: string = '';
  @Input() campos: CampoFormulario[] = [];
  @Input() formGroupPai!: FormGroup; // Recebe o FormGroup criado no componente pai
}