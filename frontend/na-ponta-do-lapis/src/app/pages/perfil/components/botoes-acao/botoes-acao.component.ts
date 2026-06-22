import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botoes-acao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botoes-acao.component.html'
})
export class BotoesAcaoComponent {
  // Emissor de evento para avisar o componente pai que o botão salvar foi clicado
  @Output() cliqueSalvar = new EventEmitter<void>();

  aoSalvar(): void {
    this.cliqueSalvar.emit();
  }

  aoEsquecerSenha(event: Event): void {
    event.preventDefault();
    // Lógica futura de esquecer senha pode entrar aqui
    console.log('Botão Esquceu sua senha clicado (sem ação configurada ainda).');
  }
}