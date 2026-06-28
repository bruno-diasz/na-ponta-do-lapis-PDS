import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../../model/IUsuario.models';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private BASE_URL: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public obterPerfilCompleto(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}/usuario/me`);
  }

  /**
   * Dispara uma atualização parcial via PATCH para o ID especificado na URL
   */
  public atualizarParcial(id: number, dadosParciais: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.BASE_URL}/usuario/${id}`, dadosParciais);
  }
}