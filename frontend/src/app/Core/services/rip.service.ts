import {Injectable} from '@angular/core';
// @ts-ignore
import * as CryptoJS from 'crypto-js';
import {key_rip} from "../../../environments/environment";



const code = key_rip;

@Injectable({
  providedIn: 'root'
})
export class RipService {

  constructor() { }

  public rip(key:string) {
    return CryptoJS.AES.encrypt(key, code).toString();
  }

  public unrip(key:string){
    return CryptoJS.AES.decrypt(key, code).toString(CryptoJS.enc.Utf8);
  }
}
