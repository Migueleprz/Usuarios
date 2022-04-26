import {Injectable} from '@angular/core';
// @ts-ignore
import {RipService} from "./rip.service";


@Injectable({
  providedIn: 'root'
})
export class LocaStorageService {

  constructor(private ripService: RipService) { }

  public set(key: string, data: any) {
    let dts = JSON.stringify(data);
    let rip = this.ripService.rip(dts);
    localStorage.setItem(key, rip);
    return rip;
  }

  public get(key:string) {
    const data:any = localStorage.getItem(key);
    const rip = this.ripService.unrip(data);
    return JSON.parse(rip);
  }

  public remove(key:string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
