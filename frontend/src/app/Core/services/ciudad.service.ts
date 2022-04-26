import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CiudadModel} from "../Models/CiudadModel";

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private readonly url = environment.urlCiudad;

  constructor(private http: HttpClient) { }


  async findAll(): Promise<any> {
    // @ts-ignore
    return await this.http.get<any>(this.url).toPromise();
  }
}
