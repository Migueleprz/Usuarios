import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../Models/UserModel";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly url = environment.urlUsuario;
  private readonly urlregistro = environment.urlRegistro;

  constructor(private http: HttpClient) { }


  async findAll(): Promise<UserModel[]> {
    // @ts-ignore
    return await this.http.get<boolean>(this.url).toPromise();
  }

  async getUsuarios(id: number): Promise<any> {
    // @ts-ignore
    return await this.http.get(`${this.url}/${id}`).toPromise();
  }

  async saveUsuario(data:UserModel): Promise<any> {
    // @ts-ignore
    return await this.http.post(this.urlregistro,data).toPromise();
  }

  async updateUsuario(data:UserModel): Promise<any> {
    // @ts-ignore
    let id = data.id;
    return await this.http.put(`${this.url}/${id}`,data).toPromise();
  }

  async deletetUsuario(id: number): Promise<any> {
    // @ts-ignore
    return await this.http.delete(`${this.url}/${id}`).toPromise();
  }

}
