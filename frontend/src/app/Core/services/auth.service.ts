import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.urlLogin;

  constructor(private http: HttpClient) { }

  async login(data:any): Promise<boolean> {
    // @ts-ignore
    return await this.http.post<boolean>(this.url, data).toPromise();
  }
}
