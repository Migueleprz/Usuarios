import { Injectable } from '@angular/core';
import Swal from'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public alertMensaje(msg:string,type:any):void{
    Swal.fire({
      text: msg,
      icon: type,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#003049ff',
      buttonsStyling:true,
    })
  }

  public alertConfirm(msg:string,icon:any){
    return new Promise(resolve=>{
      Swal.fire({
        icon:icon,
        text:msg,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c1121fff',
        cancelButtonColor: '#003049ff',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        buttonsStyling:true,
        customClass:{
          confirmButton:'btn',
          cancelButton:'btn',
        }
      }).then((result)=>{
        resolve(result.isConfirmed);
      })
    });
  }
}
