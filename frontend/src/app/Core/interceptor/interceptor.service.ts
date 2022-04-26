import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocaStorageService} from "../services/loca-storage.service";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private locaStorageService:LocaStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = localStorage.getItem('token');
    if (data) {
      const token = this.locaStorageService.get('token');
      const req2 = req.clone({
        setHeaders: {
          ContentType: 'application/json',
          Authorization: `${token}`
        }
      });
      return next.handle(req2);
    } else{
      const req2 = req.clone({
        setHeaders: {
          ContentType: 'application/json',
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      return next.handle(req2);
    }
    // @ts-ignore

  }
}
