import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BotoesAcaoComponent } from '../botoes-acao/botoes-acao.component';
import { FormularioSecaoComponent, CampoFormulario } from '../formulario-secao/formulario-secao.component';
import { UsuarioService } from '../../service/perfil.services';

@Component({
  selector: 'app-ajustes-do-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormularioSecaoComponent, BotoesAcaoComponent],
  templateUrl: './ajustes-do-perfil.component.html'
})
export class AjustesPerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  
  private usuarioId!: number;

  public camposDetalhes: CampoFormulario[] = [];
  public camposSenha: CampoFormulario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  private inicializarFormulario(): void {
    this.perfilForm = this.fb.group({
      nome: [''],
      email: [''],
      senhaAtual: [''],
      confirmarSenhaAtual: [''],
      novaSenha: [''],
      confirmarNovaSenha: ['']
    });

    this.configurarCamposEstaticos();
  }

  private configurarCamposEstaticos(nome = 'Erick Carlos...', email = 'erick@gmail.com'): void {
    this.camposDetalhes = [
      { key: 'nome', label: 'Nome', placeholder: nome },
      { key: 'email', label: 'Email', placeholder: email }
    ];

    this.camposSenha = [
      { key: 'senhaAtual', label: 'Mudar senha', placeholder: 'Coloque senha atual...', type: 'password' },
      { key: 'confirmarSenhaAtual', label: '\u00A0', placeholder: 'Confirme senha...', type: 'password' },
      { key: 'novaSenha', label: 'Nova senha', placeholder: 'Coloque sua nova senha...', type: 'password' },
      { key: 'confirmarNovaSenha', label: '\u00A0', placeholder: 'Confirme nova senha...', type: 'password' }
    ];
  }

  private carregarDadosIniciais(): void {
    this.usuarioService.obterPerfilCompleto().subscribe({
      next: (usuario) => {
        this.usuarioId = usuario.id;

        this.configurarCamposEstaticos(
          usuario.nome || 'Erick Carlos...',
          usuario.email
        );
      },
      error: (err) => {
        console.error('Erro ao alimentar os placeholders da tela de ajustes:', err);
      }
    });
  }

  public salvarMudancas(): void {
    const valoresFormulario = this.perfilForm.value;
    const dadosParciaisPatch: any = {};

    if (valoresFormulario.nome && valoresFormulario.nome.trim() !== '') {
      dadosParciaisPatch.nome = valoresFormulario.nome.trim();
    }

    if (valoresFormulario.email && valoresFormulario.email.trim() !== '') {
      dadosParciaisPatch.email = valoresFormulario.email.trim();
    }

    if (valoresFormulario.novaSenha && valoresFormulario.novaSenha.trim() !== '') {
      dadosParciaisPatch.senha = valoresFormulario.novaSenha;
    }

    if (Object.keys(dadosParciaisPatch).length === 0) {
      return;
    }

    this.usuarioService.atualizarParcial(this.usuarioId, dadosParciaisPatch).subscribe({
      next: (usuarioAtualizado) => {
        this.perfilForm.reset();
        this.configurarCamposEstaticos(usuarioAtualizado.nome, usuarioAtualizado.email);
      },
      error: (err) => {
        console.error('Erro ao salvar via PATCH:', err);
      }
    });
  }
}