import da from '@angular/common/locales/da';
import to from '@angular/common/locales/to';
import { Injectable } from '@angular/core';


const TOKEN = "token"
const USUARIO = "usuario"

@Injectable({
  providedIn: 'root',
})



export class StorageService {

  constructor(){}

  static salvarToken(token:string):void {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.setItem(TOKEN, token)
  }

  static salvarUser(user:any){
    window.localStorage.removeItem(USUARIO)
    window.localStorage.setItem(USUARIO, JSON.stringify(user))
  }

  static getToken(): string | null{
    return localStorage.getItem(TOKEN)
  }

  static getUsuario(): any | null {
    const dados = localStorage.getItem(USUARIO)
    if (dados == null){
      return null
    } 
    return JSON.parse(dados);
  }

  static getPapel(): string {
    const usuario = this.getUsuario();
    if (usuario == null){
      return "";
    }
    return usuario.papeis[0];
  }

  static eAdminSiteLogado(): boolean {
    if (this.getUsuario() == null){
      return false
    }
    const papel:string = this.getPapel()
    return "ROLE_ADMIN_SITE" == papel;
  }

  static eUsuarioLogado(): boolean {
    if (this.getUsuario() == null){
      return false;
    }
    const papel:string = this.getPapel()
    return "ROLE_USUARIO" == papel; 
  }

  static logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USUARIO);
  }
}