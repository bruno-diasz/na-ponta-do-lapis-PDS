import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioSecaoComponent, CampoFormulario } from '../formulario-secao/formulario-secao.component';
import { BotoesAcaoComponent } from '../botoes-acao/botoes-acao.component'; // <-- Importe o novo componente aqui

@Component({
  selector: 'app-ajustes-do-perfil',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormularioSecaoComponent,
    BotoesAcaoComponent // <-- Adicione aqui
  ],
  templateUrl: './ajustes-do-perfil.component.html',
  styleUrl: './ajustes-do-perfil.component.css'
})
export class AjustesDoPerfilComponent {
  
  perfilForm: FormGroup;

  camposDetalhes: CampoFormulario[] = [
    { key: 'nome', label: 'Nome', placeholder: 'Erick ...' },
    { key: 'sobrenome', label: 'Sobrenome', placeholder: 'Carlos ...' },
    { key: 'email', label: 'Email', placeholder: 'erick@gmail.com' },
    { key: 'celular', label: 'Celular', placeholder: '849999-9999', isCelular: true }
  ];

  camposSenha: CampoFormulario[] = [
    { key: 'senhaAtual', label: 'Mudar senha', placeholder: 'Coloque senha atual...', type: 'password' },
    { key: 'confirmarSenhaAtual', label: '', placeholder: 'Confirme senha...', type: 'password' },
    { key: 'novaSenha', label: 'Nova senha', placeholder: 'Coloque sua nova senha...', type: 'password' },
    { key: 'confirmarNovaSenha', label: '', placeholder: 'Confirme nova senha...', type: 'password' }
  ];

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nome: [''],
      sobrenome: [''],
      email: [''],
      celular: [''],
      senhaAtual: [''],
      confirmarSenhaAtual: [''],
      novaSenha: [''],
      confirmarNovaSenha: ['']
    });
  }

  salvarMudancas(): void {
    const valoresFormulario = this.perfilForm.value;
    
    // Filtra o objeto mandando apenas o que não for vazio
    const dadosParaAtualizar = Object.keys(valoresFormulario)
      .filter(key => {
        const valor = valoresFormulario[key];
        return valor !== null && valor !== undefined && String(valor).trim() !== '';
      })
      .reduce((obj: any, key) => {
        obj[key] = valoresFormulario[key].trim();
        return obj;
      }, {});

    if (Object.keys(dadosParaAtualizar).length === 0) {
      console.log('Nenhuma alteração foi digitada.');
      return;
    }

    // Objeto limpo pronto para enviar via PUT ao Spring Boot
    console.log('Payload limpo enviado do componente de botões:', dadosParaAtualizar);
    
    // Exemplo de integração futura:
    // this.userService.atualizarPerfil(dadosParaAtualizar).subscribe(...);
  }
}